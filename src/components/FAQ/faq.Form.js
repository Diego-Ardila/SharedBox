import React, {useState} from "react";
import styled from "styled-components";
import Logo from "../../logo.svg";



const base = {
    questionId : "question",
    responseId : "response"
}

const FormWrapper = styled.section`
    background: linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -4px -8px 2px rgba(248, 239, 239, 0.25);
    width: 100%;
    height: 100%;
    left: 74px;
    top: 133px;
    display: flex ;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    align-items: center;
    font-weight: bold;
`
const TextAreaDesc = styled.input`
    width: 250px;
    height: 100px;
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
const Button = styled.button`
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
    &:hover{
        cursor:pointer
    }
`


export default function FrequentAskedQuestionsForm (props) {

    const[question,setQuestion] = useState("");
    const[answer,setAnswer] = useState("");


    const handleChange = (event) => {
        const {name , value} = event.target
        if(name===base.questionId) setQuestion(value);
        if(name===base.responseId) setAnswer(value);
    }

    const handleCreationFAQ = (event) => {
        event.preventDefault()
        const faq = {
            question,
            answer
        }
        props.handleNewFaq(faq);
        setQuestion("");
        setAnswer("");
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
    }

    return(
        <FormWrapper>
            <img src={Logo} alt="logo"></img>
            <br></br>
            <br></br>
            <form>
                <label htmlFor = {base.questionId}>what is a common question you are asked about this space?</label>
                <br></br>
                <input 
                onChange={handleChange}
                id = {base.questionId} 
                name = {base.questionId}
                type = "text"
                value = {question}
                />
                <br></br>
                <label html = {base.responseId}>And what is your answer? </label>
                <br></br>
                <TextAreaDesc onChange={handleChange} id = {base.responseId} name={base.responseId} type = "textarea" value={answer} ></TextAreaDesc>
                <br></br>
                <br></br>
                <Button onClick={handleCreationFAQ} >Create FAQ</Button>
                <br></br>
                <Button onClick= {handleSubmit}>Submit FAQ's</Button>
            </form>
        </FormWrapper>
    )
}