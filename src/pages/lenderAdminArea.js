import React from 'react';
import styled from "styled-components"
import SpaceCard from '../components/lenderAdminArea/spaceCard';


const MainWrapper = styled.section`
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 63.02%, rgba(247, 214, 191, 0.1) 100%), linear-gradient(180deg, #FFF9F4 0%, #F7D6BF 100%);
    width: 100vw;
    height: 100vh;
` 
const TitleContainer = styled.div`
  grid-column: 2 / span 2;
  grid-row: 1;
  border: 1px solid black;
  display: flex;
  align-content: center;
  justify-content: center;
    font-size: 1em;
    font-weight: bold;
`
const MainSpaceContainer = styled.div`
  grid-column: 4;
  grid-row: span 4;
  border: 1px solid black;
` 
const WhiteSpaceContainer = styled.div`
  grid-column: 2 / span 2;
  grid-row: 2;
  border: 1px solid black;
`
const SpaceCardContainer = styled.div`
  grid-column: 2 / span 2;
  grid-row: 3;
  border: 1px solid black;
`
const MarginContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / span 4;
  border: 1px solid black;
`
const AddNewSpaceContainer = styled.div`
  grid-column: 2 / span 2;
  grid-row: 4 ;
  border: 1px solid black;
`
export default function LenderAdminArea () {
    return (
    <MainWrapper>
    <div className="lenderAdminArea">
        <TitleContainer><h1>your spaces</h1></TitleContainer>
        <MainSpaceContainer></MainSpaceContainer>
        <WhiteSpaceContainer></WhiteSpaceContainer>
        <SpaceCardContainer>
            <SpaceCard></SpaceCard>
        </SpaceCardContainer>
        <MarginContainer></MarginContainer>
        <AddNewSpaceContainer></AddNewSpaceContainer>
    </div>
    </MainWrapper>
    )
}