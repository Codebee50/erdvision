

export const handleGenericError= (e) =>{
    console.log(e)
    if(e?.response){
        return e?.response?.data.message || e?.response?.data?.detail || "An unexpected error occurred"
    }

    if(e?.data){
        return e?.data.message
    }

    if(e?.message){
        return e?.message
    }

    return "An unexpected error occurred"
}