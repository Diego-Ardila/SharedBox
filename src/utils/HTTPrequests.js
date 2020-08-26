import axios from "axios"


const getSuggestions = async () => {
    try{
        const tags = await axios({
            method: "GET",
            url: "http://127.0.0.1:4000/spaceTags/all"
        })
        return tags.data
    }catch(error){
        return error
    }
}

export {
    getSuggestions
}