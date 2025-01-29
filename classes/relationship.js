import { baseBeUrl } from "@/urls/be";
import Cookies from "js-cookie";
import axios from "axios";
import { WriteSocket } from "./socketManger";

export default class Relationship {
  constructor({
    from_column,
    to_column,
    flow_id,
    id,
    rel_type = "one-to-one",
    synced = false,
    created = false,
    source_node_id,
    target_node_id,
    source_suffix,
    target_suffix,
    from_rel = "one",
    to_rel = "one",
  }) {
    this.from_column = from_column;
    this.to_column = to_column;
    this.flow_id = flow_id;
    this.id = id;
    this.rel_type = rel_type;
    this.synced = synced;
    this.created = created;
    this.source_node_id = source_node_id;
    this.target_node_id = target_node_id;
    this.source_suffix = source_suffix;
    this.target_suffix = target_suffix;
    (this.from_rel = from_rel), (this.to_rel = to_rel);
  }

  async createRelationship() {
    const url = `${baseBeUrl}/diagram/relationship/create/`;
    const relData = {
      from_column: parseInt(this.from_column),
      to_column: parseInt(this.to_column),
      source_suffix: this.source_suffix,
      target_suffix: this.target_suffix,
      rel_type: this.rel_type,
      from_rel: this.from_rel,
      to_rel: this.to_rel,
    };

    try {
      const accessToken = Cookies.get("userToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(url, relData, { headers });
      if (response.status === 201 || response.status === 200) {
        this.id = response.data.id;
        this.synced = true;
        this.created = true;

        const socket = WriteSocket.getSocket();
        if (socket) {
          socket.send(
            JSON.stringify({
              action: "RELATIONSHIP_CREATED",
              relationship: {
                from_column: parseInt(this.from_column),
                to_column: parseInt(this.to_column),
                source_suffice: this.source_suffix,
                target_suffix: this.target_suffix,
                rel_type: this.rel_type,
                from_rel: this.from_rel,
                to_rel: this.to_rel,
              },
            })
          );
        }

        console.log("relationship created successfully");
        return true;
      }
    } catch (error) {
      console.log("An error occurred while creating relationship", error);
      this.synced = false;
      this.created = false;
      return false;
    }
  }

  async deleteObject() {
    const url = `${baseBeUrl}/diagram/relationship/delete/${this.id}/`;
    try {
      const accessToken = Cookies.get("userToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.delete(url, { headers });
      if (response.status === 204) {
        console.log("relationship deleted successfully");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("An error occurred while deleting relationship", error);
      return false;
    }
  }

  async syncObject() {
    if (!this.created) {
      const created = await this.createRelationship();
      return created;
    }
    const url = `${baseBeUrl}/diagram/relationship/sync/${this.id}/`;
    const syncData = {
      from_rel: this.from_rel,
      to_rel: this.to_rel,
    };

    try {
      const accessToken = Cookies.get("userToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.patch(url, syncData, { headers });
      if (response.status === 200) {
        console.log("Relationship synced successfully");
        this.synced = true;
        return true;
      } else {
        console.log("Could not sync relationship");
        this.synced = false;
        return false;
      }
    } catch (error) {
      console.log("an error occurred while syncing relationship");
      this.synced = false;
      return false;
    }
  }
}
