import React, {useState} from "react";
import styled from "styled-components";
import Logo from "../../logo.svg";
import {Container,
        Button,
        Form,
        Row,
        Col       } from 'react-bootstrap';
import Axios from "axios";



const base = {
    questionId : "question",
    responseId : "response"
}



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
        Axios({
            method: "POST",
            url: "http://127.0.0.1:8000/queAns",
            data: {
               // spaceId: props.spaceId,
                spaceId:123456789,
                faqs:props.faqs
            } 
        },console.log(props.faqs))
        .then(({data})=> console.log(data))
        .catch((err)=>console.log(err))
    }

    return(
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label >what is a common question you are asked about this space?</Form.Label>
                <Form.Control   onChange={handleChange}
                                name = {base.questionId}
                                type = "textarea"
                                value = {question}/>
                            <br></br>
                            <br></br>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label >And what is your answer?</Form.Label>
                <Form.Control  onChange={handleChange} name={base.responseId} type = "textarea" value={answer}/>
            </Form.Group>
                <Button onClick={handleCreationFAQ} >Create FAQ</Button>
                <br></br>
                <Button onClick= {handleSubmit}>Submit FAQ's</Button>
        </Form>
    )
}