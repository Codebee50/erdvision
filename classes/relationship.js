import { baseBeUrl } from "@/urls/be";
import Cookies from "js-cookie";
import axios from "axios";

export default class Relationship {
  constructor({
    from_column,
    to_column,
    flow_id,
    id,
    rel_type = "",
    synced = false,
    created = false,
  }) {
    this.from_column = from_column;
    this.to_column = to_column;
    this.flow_id= flow_id;
    this.id=id;
    this.rel_type = rel_type;
    this.synced=synced;
    this.created=created
  }

  async createRelationship(){
    const url = `${baseBeUrl}/diagram/relationship/create/`
    const relData = {
        from_column : this.from_column,
        to_column: this.to_column
    }

    try{
        const accessToken = Cookies.get('userToken')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        const response = await axios.post(url, relData, {headers});
        if(response.status === 201 || response.status === 200){
            this.id = response.data.id;
            this.synced= true;
            this.created= true;
            console.log('relationship created successfully')
            return true
        }
    }
    catch(error){
        console.log("An error occurred while creating relationship")
        this.synced = false;
        this.created = false;
        return false;
    }
  }


  async syncObject(){
    if(!this.created){
        const created = await this.createRelationship()
        return created
    }

    
  }
}
