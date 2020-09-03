import React from "react"
import styled from "styled-components"

const ImageHolder = styled.img`
width: 300px;
height: 189.13px;
border-radius: 40px;
` 

export default function DisplayPhotos (props) {
    return(
        <ImageHolder src={"https://globoinmobiliario.com/wp-content/uploads/BODEGA-183-184.jpg"}></ImageHolder>
    )
}