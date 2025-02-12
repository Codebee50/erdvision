import axios from "axios";
import { baseBeUrl } from "@/urls/be";
import Cookies from "js-cookie";
import SyncResponse from "./syncResponse";
import { WriteSocket } from "./socketManger";

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

        const socket = WriteSocket.getSocket();
        if (socket) {
          socket.send(
            JSON.stringify({
              action: "TABLE_CREATED",
              id: this.id,
              name: this.name,
              x_position: 0,
              y_position: 0,
              created: true,
              synced: true,
            })
          );
        }
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
    this.columns.forEach((column) => {
      if (!column.synced) {
        column.syncObject();
      }
    });
  }

  async deleteObject() {
    const url = `${baseBeUrl}/diagram/table/delete/${this.id}/`;
    try {
      const accessToken = Cookies.get("userToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.delete(url, { headers });
      if (response.status === 204) {
        const socket = WriteSocket.getSocket();
        if (socket) {
          socket.send(
            JSON.stringify({
              action: "TABLE_DELETED",
              id: this.id,
            })
          );
        }
        console.log("table deleted successfully");
      }
    } catch (error) {
      console.log("Failed to delete table");
    }
  }

  /** Ensure the frontend is consistent with the backend */
  async syncObject() {
    if (!this.created) {
      const created = await this.createTable();
      this.syncColumns();

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

      const response = await axios.patch(url, syncData, { headers });

      if (response.status === 200) {
        this.synced = true;
        const socket = WriteSocket.getSocket();
        if (socket) {
          socket.send(
            JSON.stringify({
              action: "TABLE_CHANGED",
              table_id: this.id,

              table: {
                name: this.name,
                x_position: this.x_position,
                y_position: this.y_position,
              },
            })
          );
        }
        console.log("Table synced successfully");
        this.syncColumns();
        return true;
      }

      this.syncColumns();
    } catch (error) {
      console.log("An error occurred while syncing table", error);
      this.synced = false;
      return false;
    }
  }
}
