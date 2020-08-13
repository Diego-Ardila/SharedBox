import React, {useState} from 'react'
const base = {
    nameID: "profile-name",
    emailID: "profile-email",
    scoreID: "profile-score",
    spaceID: "profile-space",
    formID: "profile-form",
    submitId: "profile-submit"
}
function ProfileForm(){
    let [name,setName]=useState("diego");
    let [email,setEmail]=useState("");
    let [score,setScore]=useState("");
    let [space,setSpace]=useState([]);
    return(
        <div>
            <form  > 
                Name: {name}
            </form>

        </div>
    )
}
export default ProfileForm;