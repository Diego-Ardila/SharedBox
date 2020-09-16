import React, {useState} from "react";
import {
        Button,
        Form  } from 'react-bootstrap';
import { postFAQs } from "../../utils/HTTPrequests";
import swal from "sweetalert";

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

    const handleSubmit = async (event) => {
        event.preventDefault()
       const newFaqs= props.faqs.map(faq=>{
           return{
               ...faq,
               spaceId:props.spaceId
           }
       })
       try{
           await postFAQs(newFaqs)
           swal("FAQs saved correctly","your FAQs were saved succesfully","success")
           props.hideEditFAQ()
       }catch(err){
           swal("Upss something went wrong",`${err.message}`,"error")
       }
    }

    return(
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label >what is a common question you are asked about this space?</Form.Label>
                <Form.Control   onChange={handleChange}
                                name = {base.questionId}
                                type = "textarea"
                                value = {question}/>

            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label >And what is your answer?</Form.Label>
                <Form.Control  onChange={handleChange} name={base.responseId} type = "textarea" value={answer}/>
            </Form.Group>
                <Button onClick={handleCreationFAQ} >Create FAQ</Button>
                <Button onClick= {handleSubmit}>Submit FAQ's</Button>
        </Form>
    )
}
