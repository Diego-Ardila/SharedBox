import React from 'react';
import styled from "styled-components";

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

export default function Rendericer ({faqs,deleteFaq}) {

    return (
        <FormWrapper>
            {faqs.map(({id,question,answer}) => {
                return (
                <div key= {id} >
                 <h4>{question}</h4>
                 <h5>{answer}</h5>
                 <button onClick={deleteFaq(id)}>Delete FAQ</button>
                </div>
                )
            })}
        </FormWrapper>
    )
} 