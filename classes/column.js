import { baseBeUrl } from "@/urls/be";
import axios from "axios";
import Cookies from "js-cookie";

export default class DbColumn {
  constructor({
    id,
    flow_id,
    table_id,
    name,
    datatype,
    synced = false,
    is_primary_key = false,
    is_nullable = false,
    is_unique = false,
    created = false,
  }) {
    this.id = id;
    this.table_id = table_id;
    this.name = name;
    this.datatype = datatype;
    this.is_primary_key = is_primary_key;
    this.is_nullable = is_nullable;
    this.is_unique = is_unique;
    this.synced = synced;
    this.created = created;
    this.flow_id = flow_id
  }
  async createColumn() {
    const url = `${baseBeUrl}/diagram/column/create/`;
    const columnData = {
      db_table: this.table_id,
      name: this.name,
      datatype: this.datatype,
    };
    try {
      const accessToken = Cookies.get("userToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(url, columnData, { headers });
      if (response.status === 201 || response.status === 200) {
        this.id = response.data.id;
        this.synced = true;
        this.created = true;
        console.log('Column created successfully')
        return true;
      } else {
        console.log("An error occurred while creating the db column", response);
        this.synced = false;
        this.created = false;
        return false;
      }
    } catch (error) {
      console.log("An error occurred while creating the column", error);
      this.synced = false;
      this.created = false;
      return false;
    }
  }

  async syncObject() {
    console.log('syncing column')
    if (!this.created) {// this means table has not yet been created
      return await this.createColumn();
    }

    const url = `${baseBeUrl}/diagram/column/sync/${this.id}/`
    const syncData = {
      name: this.name,
      datatype: this.datatype,
      is_primary_key: this.is_primary_key,
      is_nullable: this.is_nullable,
      is_unique: this.is_unique,
    }

    try {
      const accessToken = Cookies.get('userToken')
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
    const response = await axios.patch(url, syncData, {headers})
    if(response.status === 200){
      this.synced = true
      console.log('Column synced successfully')
      return true
    }else{
      console.log('An error occurred while syncing the column')
      this.synced = false
      return false
    }

  }catch(error){
    console.log('An error occurred while syncing the column', error)
    this.synced = false
    return false
  }
  
}

}
