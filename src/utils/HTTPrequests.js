import axios from "axios"

const userRegister = async (typeUser,values)=>{
    try{
        const userToken = await axios ({
            baseURL: "http://127.0.0.1:4000/",
            url: typeUser,
            method: "POST",
            data: values,
        }) 
        return userToken
    }
     catch(error){
        throw error
    }
}

const getDataUser = async (typeUser)=>{
    const user = (typeUser === "tenant" ? `"${typeUser}"`:``)
    try{
        const dataUser = await axios({
            method:"GET",
            baseURL: "http://127.0.0.1:4000/",
            url: typeUser,
            headers:{
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'x-UserType' : user
            }
        })
        return dataUser
    }catch(error){
        throw error
    }
}

const UpdateDatauser = async (typeUser,values) => {
    try{

    }
    catch(error){
        throw error
    }
}

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
        throw err
    }
}

const updateSpaceTag = async (spaceId, name) => {
    try{
        const response = await axios({
            method:"PUT",
            url:"http://127.0.0.1:4000/spaceTags",
            headers:{
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            data: {
                name,
                spaceId
            }
        })
        return response.data
    }catch(err) {
        return err
    }
}

const postTag = async (spaceId, name)=>{
    try {
        const respose = await axios({
            method:"POST",
            url:"http://127.0.0.1:4000/spaceTags",
            headers:{
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            data:{
                name,spaces:spaceId
            }
        })
        return(respose.data)
    }
    catch(err){
        console.dir(err)
    }
}

export {
    userRegister,
    getDataUser,
    UpdateDatauser,
    getSuggestions,
    postSpace,
    postTag,
    updateSpaceTag,
    
}