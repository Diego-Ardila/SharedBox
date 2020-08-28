import React, { useRef } from "react"
import styled from "styled-components"
import TagManager from "./tagsManager"
import {useSelector, useDispatch} from "react-redux"
import { changeDescription, changePublishAreaView } from "../../actions/publishArea.actions"

const base = {
    formClass : "descriptionForm",
    textAreaId: "descriptionTextArea"
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
const TextAreaDesc = styled.input`
    width: 310px;
    height: 210px;
    left: 455px;
    top: 682px;
    background: #318FB5;
    opacity: 0.4;
    border-radius: 40px;
    text-align: center;
    outline: none;
    color: #001244;
    font-weight: bold;
    &:hover{
        box-shadow: 0 0 3pt 2pt #B0CAC7;
        opacity: 0.7;
    }
    &:focus{
        box-shadow: 0 0 3pt 2pt #B0CAC7;
        opacity: 0.7;
    }
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

export default function DescriptionForm () {
    
    const dispatch = useDispatch()
    const textAreaDesc = useSelector(state => state.publishAreaReducer.textAreaDesc)
    const textArea = useRef()

    const handleChange = (action, input) => {
        return (event) => dispatch(action(input.current.value))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(changePublishAreaView(4))
    }
    
    return (
       <FormWrapper>
           <h1>Now tell us more about what a tenant could expect:</h1>
           <h5>add some tags that describes your space! <br></br> it will be easier for tenants to find you<br></br>psst... pro tip, add at least 3</h5>
           <TagManager></TagManager>
           <p>{`________________________<o>________________________`}</p>
           <h5>something more to say? add any additional info <br></br> that can be useful for your clients</h5>
           <form className = {base.formClass} onSubmit = {handleSubmit}>
                <TextAreaDesc type="textarea" ref = {textArea} id={base.textAreaId} value={textAreaDesc} onChange ={handleChange(changeDescription, textArea)}></TextAreaDesc>
                <br></br>
                <NextButton type="submit" value="submit">next</NextButton>
           </form>
       </FormWrapper> 
    )
}