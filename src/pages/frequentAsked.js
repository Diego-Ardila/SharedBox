import React, {useState} from 'react';
import FormFaq from '../components/FAQ/faq.Form';
import Rendericer from '../components/FAQ/faq.rendericer';
import {Container,
    Form,
    Row,
    Col} from 'react-bootstrap';


export default function FrequentAskedQuestions (props) {

    let [faqs , setFaqs] = useState([])

    const handleNewFaq = (faq) => {
        let newFaq = {
            id: faqs.length + 1,
            ...faq
        }
        setFaqs(faqs = faqs.concat(newFaq))
    }

    const deleteFaq = (id) =>{
       return () => {
                let newFaqs = faqs.filter(faq=>{
                    return faq.id !== id
                })
                setFaqs(newFaqs)
              } 
    } 

    return (
        <div>
            <Container className="FAQ">
                <Form>
                 <Row>
                    <Col lg={6} md={6} xl={6}>  <FormFaq spaceId={/* props.spaceId */1231231231} faqs={faqs} handleNewFaq={handleNewFaq} /> </Col>
                    <Col lg={6} md={6} xl={6}> <Rendericer faqs={faqs} deleteFaq= {deleteFaq} /> </Col>
                </Row>
                </Form>
            </Container>
        </div>
    )
}

