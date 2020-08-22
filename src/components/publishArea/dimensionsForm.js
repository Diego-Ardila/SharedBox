import React from "react"
import styled from "styled-components"


const base = {
    widthId: "width",
    lengthId: "length",
    heightId: "height",
    pricePerDayId: "pricePerDay",
    spaceTagsId: "spaceTags",
    
    additionalInfoId: "additionalInfo",
    formClass : "space_form",
    submitId : "space_submit"
}

const FormWrapper = styled.section`
    background: linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -4px -8px 2px rgba(248, 239, 239, 0.25);
    width: 528px;
    height: 701px;
    left: 74px;
    top: 133px;
    display: flex ;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-weight: bold;
    flex-direction: column;
`

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


export default function BasicSpaceInfo (props){

    const handleSubmit = (event) => {
        event.preventDefault();
        //axios call pending
        console.log("values");
    }

    return(
        
        <FormWrapper>
        <h1>Tell us a little more about your space:</h1>
        <form className = {base.formClass} onSubmit = {handleSubmit}>  
            <label htmlFor ={base.widthId}> the width space in Mts</label>
            <br></br>
            <input
                id = {base.widthId}
                name = {base.widthId}
                type = "range"
                min = {0}
                max = {200}
                step = {1}
                >
            </input>
            
            <br></br>
            <label htmlFor ={base.lengthId}> the length of your space in Mts</label>
            <br></br>
            <input
                id = {base.lengthId}
                name = {base.lengthId}
                type = "range"
                min = {0}
                max = {200}
                step = {1}
                >
            </input>
            
            <br></br>

            <label htmlFor ={base.heightId}> how tall is your space in Mts</label>
            <br></br>
            <input
                id = {base.heightId}
                name = {base.heightId}
                type = "range"
                min = {0}
                max = {200}
                step = {1}
                >
            </input>
            
            <br></br>

            {/* 
             */}

            <NextButton type="submit" id={base.submitId} value="submit">next</NextButton>

        </form>
        </FormWrapper>
    )
}
