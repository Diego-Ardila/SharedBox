import React, {useState} from "react"
import styled from "styled-components"
import BasicSpaceForm from "../components/publishArea/BasicSpaceForm"
import PhotoUploadForm from "../components/publishArea/photosUploadForm"

const MainWraper = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width : 100vh;
  height: 100vh;
  background: linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
`

export default function PublishArea (props) {
    const [formToRender, setFormToRender] = useState("BasicSpaceForm")
    return (
        <MainWraper>
            {/* <BasicSpaceForm></BasicSpaceForm> */}
            <PhotoUploadForm></PhotoUploadForm>
            {/* <FAQForm></FAQForm> */}
        </MainWraper>
    )
}