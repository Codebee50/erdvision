import axios from "axios";
import { baseBeUrl } from "@/urls/be";
import Cookies from "js-cookie";

export default class DbTable {
  constructor(
    diagram,
    name,
    id,
    columns,
    x_position,
    y_position,
    synced = false,
    created = true
  ) {
    this.name = name;
    this.id = id;
    this.columns = columns;
    this.x_position = x_position;
    this.y_position = y_position;
    this.synced = synced;
    this.diagram = diagram;
    this.created = created;
  }

  async createTable() {
    const url = `${baseBeUrl}/diagram/table/create/`;
    const tableData = {
      name: this.name,
      diagram: this.diagram,
      x_position: this.x_position,
      y_position: this.y_position,
    };

    try {
      const response = await axios.post(url, tableData);
      if (response.status === 201 || response.status === 200) {
        this.id = response.data.id;
        this.synced = true;
        this.created = true;
        console.log("Table created successfully");
      }
    } catch (error) {
      console.log("An error occurred while creating table", error);
      this.synced = false;
    }
  }

  async syncObject() {
    if (!this.created) {
      await this.createTable();
      return;
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

      const response = await axios.patch(url, syncData, { headers });

      if (response.status === 200) {
        this.synced = true;
        console.log("Table synced successfully");
      }
    } catch (error) {
      console.log("An error occurred while syncing table", error);
      this.synced = false;
    }
  }

  updatePositions() {}
}
