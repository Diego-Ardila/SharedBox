import React, { useState } from 'react';
import styled from "styled-components";
import { Container } from 'react-bootstrap';
import { Toast } from "react-bootstrap"

// const FormWrapper = styled.section`
//     background: linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
//     box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -4px -8px 2px rgba(248, 239, 239, 0.25);
//     width: 100%;
//     height: 100%;
//     left: 74px;
//     top: 133px;
//     display: flex ;
//     justify-content: center;
//     flex-direction: column;
//     align-content: center;
//     align-items: center;
//     font-weight: bold;
// `

export default function Rendericer ({faqs,deleteFaq}) {
 
    return (
        <Container>
            {faqs.map(({id,question,answer}) =>{ 
                return (            
                <Toast show={true} onClose={deleteFaq(id)}>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">{question}</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>{answer}</Toast.Body>
                </Toast>
                )}
            )}
        </Container>
    )
} 