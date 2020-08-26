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
const postSpace=async (state)=>{
    const {textAreaDesc,width,length,height,city,address,price,title,area} = state
    
    try{
        const respose = await axios({
            method:"POST",
            url:"http://127.0.0.1:4000/space",
            headers:{
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            data:{
                title,width,length,height,textAreaDesc,city,address,pricePerDay:price,area
            }
        })
        return(respose.data._id)
    }catch(err){
        console.dir(err)
    }
}

export {
    getSuggestions,
    postSpace
}