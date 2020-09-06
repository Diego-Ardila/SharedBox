import React from "react"
import styled from "styled-components"
import DimensionsForm from "../components/publishArea/dimensionsForm"
import PhotoUploadForm from "../components/publishArea/photosUploadForm"
import LocationForm from "../components/publishArea/locationForm"
import DescriptionForm from "../components/publishArea/descriptionForm"
import PriceForm from "../components/publishArea/priceForm"
import {useSelector} from "react-redux"




const defaultValue = 1;
const viewSelector = (testing) => {
    switch(testing) {
        case 1 :{
            return <DimensionsForm></DimensionsForm>
        }
        case 2 :{
            return <LocationForm></LocationForm>
        }
        case 3 :{
            return <DescriptionForm></DescriptionForm>
        }
        case 4 :{
            return <PhotoUploadForm></PhotoUploadForm>
        }
        case 5 :{
            return  <PriceForm></PriceForm>
        }
        default: 
        return <></>
    }
}

const MainWraper = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width : 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
`

export default function PublishArea (props) {
    const formToRender = useSelector(state => state.publishAreaReducer.viewingForm)
    return (
        <MainWraper>
            {viewSelector(formToRender || defaultValue)}
        </MainWraper>
    )
}