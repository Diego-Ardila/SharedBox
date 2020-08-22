import React, {useState} from "react"
import styled from "styled-components"
import PhotoDisplay from "./photoDisplay"
import Logo from "../../logo.svg"

const base = {
    formClass : "photoForm",
    uploadId : "photoUpload"
}

const NextButton = styled.button`
    background: #001244;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -2px -4px 2px rgba(243, 240, 240, 0.4);
    width: 155px;
    height: 43px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    color: #FFF9F4;
    margin: 24px;
    border-radius: 40px;
`

const FormWrapper = styled.section`
    background: linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -4px -8px 2px rgba(248, 239, 239, 0.25);
    width: 528px;
    height: 701px;
    left: 74px;
    top: 133px;
    display: flex ;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    align-items: center;
    font-weight: bold;
`


export default function PhotosUploadForm () {
    const fileObj = []
    const previewBlobPhotos = []
    
    let [imagesURLs, setImagesURLs] = useState("")
    
    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            Object.values(event.target.files).forEach(file => fileObj.push(file))
            fileObj.forEach( file => previewBlobPhotos.push(URL.createObjectURL(file)))
            setImagesURLs(imagesURLs = previewBlobPhotos)   
          }
        }
    
    return (
       <FormWrapper>
           <h1>share some photos of your space!<br></br>It will be more appealing for people looking where to store their things</h1>
           {imagesURLs ? imagesURLs.map( (url, index) => <PhotoDisplay url ={url} key ={index}></PhotoDisplay>): <img src={Logo} alt="logo"></img>}
           <br></br>
           <form>
               <input type="file" accept="image/*" multiple = {true} onChange ={handleChange} ></input>
               <br></br>
               <NextButton type="submit" id={base.submitId} value="submit">next</NextButton>
           </form>
       </FormWrapper>
   ) 
}
