import React, { useState } from "react"
import styled from "styled-components"
import "./InventoryCheckElement.scss"
import { Form, Formik } from "formik"
import { updateElements } from "../../utils/HTTPrequests"
import swal from "sweetalert"

const ElementCard = styled.div`
    display: grid;
    min-height: 100px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(11, 1fr);
    grid-template-areas:
    ". .  .  .  .  .  .  .  . .   .  ."
    ". ot ot ot ot ot ot .  . .   .  ."
    ". oc oc oc oc oc oc .  . ch ch  ."
    ". dt dt dt dt dt dt .  . ch ch  ."
    ". dc dc dc dc dc dc .  . .   .  ."
    ". qt qt qt .  .  .  vt vt vt .  ."
    ". qc qc qc .  .  .  vc vc vc .  ."
    ". cc cc cc cc cc cc cc cc cc cc ."
    ". .  .  ca ca ca ca ca ca .  .  ."
    ". .  .  .  .  .  .  .  sb sb sb ."
    ". .  .  .  .  .  .  .  . .   .  .";
    align-items:center;
    justify-items:start;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    margin: 10px;
`


export default function InventoryCheckElement ({element}) {
    const [submited, setSubmited] = useState(false)

    const handleSubmit = async (values) =>{
        if(values.check) values.status = "accepted"
        if(!values.check) values.status = "rejected"
        try{
            const res = await updateElements(element._id , values)
            setSubmited(true)
        }catch(err){
            console.log(err)
            swal("ups something went wrong", "plase check your internet connection","error")
        }
    }

    return (
        <Formik
        initialValues={ {check:false, comment:"", errorCategory:"select"} }
        onSubmit={handleSubmit}
        >
        {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
        }) => 
                <Form className={`elementForm ${submited ? "cardHidden":""}`} onSubmit={handleSubmit}>
                    <ElementCard className="elementCard">
                        <h6 className="elementCard-objectTitle">Object/Element/product</h6>
                        <p className="elementCard-obectContent">{element.object}</p>
                        <h6 className="elementCard-descriptionTitle">Description</h6>
                        <p className="elementCard-descriptionContent">{element.description}</p>
                        <div className="elementCard-checkbox">
                            <input
                                name="check"
                                id="check"
                                type="checkbox"
                                style={{width:"1.5rem", height:"1.5rem", cursor:"pointer", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}
                                value={values.check}
                                onChange={handleChange}
                            ></input>
                            <label>all in order</label>
                        </div>
                        <h6 className="elementCard-quantityTitle">Quantity</h6>
                        <p className="elementCard-quantityContent">{element.quantity}</p>
                        <h6 className="elementCard-valueTitle">Value</h6>
                        <p className="elementCard-valueContent">${element.value}</p>
                        <div className={`elementCard-comment ${values.check ? "hidden": null}`} >
                            <input
                            name="comment"
                            id="comment"
                            type="textArea" 
                            placeholder="any irregularities? let us know!"
                            value={values.comment}
                            onChange={handleChange}
                            ></input>
                        </div>
                        <select 
                            className={`elementCard-commentSelect ${!values.comment || values.check ? "hidden" : null}`}
                            name="errorCategory"
                            id="errorCategory"
                            onChange={handleChange}
                            value={values.errorCategory}
                        >
                            <option value="select">select category</option>
                            <option value="incorrect ammount">incorrect ammount</option>
                            <option value="damaged product">damaged product</option>
                            <option value="product not here">product not here</option>
                            <option value="incorrect product">incorrect product</option>
                            <option value="other">other</option>
                        </select>
                        <button className="elementCard-submitButton">submit</button>
                </ElementCard>
            </Form>
        }
        </Formik>
    )
}