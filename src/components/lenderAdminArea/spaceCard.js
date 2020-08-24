import React from "react"
import styled from "styled-components"
import DisplayPhotos from "./displayPhotos"

const SpaceCardWrapper = styled.section`
    display : grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    height: 100%;
`
const PhotoWrapper = styled.section`
    grid-column: 1;
    grid-row: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export default function SpaceCard () {
    return(
        <SpaceCardWrapper>
            <PhotoWrapper>
                <DisplayPhotos></DisplayPhotos>
            </PhotoWrapper>
        </SpaceCardWrapper>
    )
}