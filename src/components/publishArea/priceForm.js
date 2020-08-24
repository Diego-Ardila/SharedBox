import React, { useRef } from "react"
import styled from "styled-components"
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {changePrice} from "../../actions/publishArea.actions"


const base= {
    priceId : "priceForm_price"
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
export default function PriceForm () {
    const dispatch = useDispatch() 
    const price = useSelector(state => state.price)
    const pr = useRef()
    const history = useHistory()

    const handleChange = (action, input) => {
        return (event) => dispatch(action(input.current.value))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        history.push("/")
    }

    return(
        <FormWrapper>
        <form onSubmit={handleSubmit}>
            <h1>and finally... lets talk about money</h1>
            <label htmlFor = {base.priceId}>how much do you expect to earn daily with your space</label>
            <input type="number" ref={pr} style={{width:"150px"}} onChange={handleChange(changePrice, pr)} id = {base.priceId} value = {price}></input>
            <br></br>
            <NextButton type="submit" id={base.submitId} value="submit">submit</NextButton>
        </form>
        </FormWrapper>
    )
}