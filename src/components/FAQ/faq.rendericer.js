import React, { useState } from 'react';
import styled from "styled-components";
import { Container } from 'react-bootstrap';
import { Toast } from "react-bootstrap"


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