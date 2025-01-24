import axios from "axios";
import { baseBeUrl } from "@/urls/be";
import Cookies from "js-cookie";
import SyncResponse from "./syncResponse";

export default class DbTable {
  constructor({
    diagram,
    flow_id,
    name,
    id,
    columns,
    x_position,
    y_position,
    synced = false,
    created = true,
  }) {
    this.name = name;
    this.flow_id = flow_id;
    this.id = id;
    this.columns = columns;
    this.x_position = x_position;
    this.y_position = y_position;
    this.synced = synced;
    this.diagram = diagram;
    this.created = created;
    console.log("table columns", columns);
  }

  /** Make a call to the backend to save the database table */
  async createTable() {
    const url = `${baseBeUrl}/diagram/table/create/`;
    const tableData = {
      name: this.name,
      diagram: this.diagram,
      x_position: this.x_position,
      y_position: this.y_position,
      flow_id: this.flow_id,
    };

    try {
      const accessToken = Cookies.get("userToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(url, tableData, { headers });
      if (response.status === 201 || response.status === 200) {
        this.id = response.data.id;
        this.synced = true;
        this.created = true;
        console.log("Table created successfully");
        return true;
      } else {
        console.log("An error occurred while creating table");
        this.synced = false;
        this.created = false;
        return false;
      }
    } catch (error) {
      console.log("An error occurred while creating table", error);
      this.synced = false;
      this.created = false;
      return false;
    }
  }

  async syncColumns() {
    console.log('syncing the columns')
    this.columns.forEach((column) => {
      console.log('aga',column)
      if (!column.synced) {
        column.syncObject();
      }
    });
  }

  /** Ensure the frontend is consistent with the backend */
  async syncObject() {
    if (!this.created) {
      const created = await this.createTable();
      this.syncColumns()
      return created;
    }

    const url = `${baseBeUrl}/diagram/table/sync/${this.id}/`;
    const syncData = {
      name: this.name,
      x_position: this.x_position,
      y_position: this.y_position,
    };

    try {
      const accessToken = Cookies.get("userToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      this.syncColumns()
      const response = await axios.patch(url, syncData, { headers });

      if (response.status === 200) {
        this.synced = true;
        console.log("Table synced successfully");
        return true;
      }
    } catch (error) {
      console.log("An error occurred while syncing table", error);
      this.synced = false;
      return false;
    }
  }
}
