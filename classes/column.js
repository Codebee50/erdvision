export default class DbColumn{
    constructor({id, table_id, name, datatype, synced=false, is_primary_key=false, is_nullable=false, is_unique=false} ){
        this.id=id;
        this.table_id= table_id;
        this.name = name
        this.datatype = datatype
        this.is_primary_key = is_primary_key,
        this.is_nullable = is_nullable,
        this.is_unique = is_unique;
        this.synced = synced
    }
    syncObject(){
        //make api request to sync column
        //if successful, set synced to true
        //else, set synced to false
    }
}