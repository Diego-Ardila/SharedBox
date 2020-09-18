import React, {useState} from 'react'
import {Modal, Col, Button, Container, Form, Card, Row, Popover, OverlayTrigger} from "react-bootstrap"
import { Formik } from 'formik'
import * as Yup from 'yup'
import InventoryRendericer from './inventoryRendericer'
import {Question} from 'react-bootstrap-icons'
import {createElements, createNotification, createDates} from '../../utils/HTTPrequests'
import moment from "moment"

export default function ModalInventory(props){
    
    let [elements,setElements] = useState([])
    const spaceId = props.space._id
    const lenderId = props.space.lenderId
    const initialDate = props.initialDate
    const finalDate = props.finalDate
    

    const handleSubmit = (values,{resetForm}) => {
        console.log(initialDate, finalDate)
        let newObj = {
            id : elements.length + 1,
            ...values 
        }       
        setElements(elements = elements.concat(newObj))
        resetForm()
    }

    const deleteObj = (id) =>{
        return () => {
            let newObj = elements.filter(obj=>{
                return obj.id !== id
            })
            setElements(newObj)
        } 
    }

    const handleToAxios = async (finalDate,initialDate,elements,spaceId,lenderId) => {
        const newfinalDate= moment(finalDate).format("YYYY-MM-DD")
        const newinitialDate = moment(initialDate).format("YYYY-MM-DD")
        const {inventoryId,tenantId} = await createElements(elements,spaceId)
        await createNotification(inventoryId,tenantId,lenderId)
        await createDates(newfinalDate,newinitialDate,spaceId,tenantId)
    }

    const validatorForm = Yup.object().shape({
        object : Yup.string().required("Required Field"),
        description : Yup.string().max(200,"maximum 200 characters").required("Required Field"),
        category : Yup.string().required("Required Field"),
        value : Yup.number().min(1,"requiered average minimun 1 "),
        quantity: Yup.number().min(1,"requiered minimun 1 object")
    })

return(
    <Modal show= {props.show} onHide= {props.onHide} size="xl" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            The Lender wants to know what are you going to store
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                <Formik initialValues={{object : "",description : "",quantity : 0 ,category : "", value:0}} onSubmit={handleSubmit} validationSchema={validatorForm}>
                {({handleSubmit,handleChange,handleBlur,values,isValid,errors,touched,resetForm})=>(
                    <Form className="col-lg-6"  
                        onSubmit={handleSubmit} >
                        <Card className = "justify-content-center p-3">
                            <Form.Row  className="justify-content-center">
                                <Col >
                                    <Form.Group>
                                        <OverlayTrigger placement="right"
                                            overlay={
                                            <Popover>
                                                <Popover.Title as="h3">Object</Popover.Title>
                                                <Popover.Content>
                                                    <Row className="m-3">
                                                        In this field write the object
                                                    </Row>
                                                    <Row className="m-3">
                                                    <strong className="mr-2">Example: </strong> Books.
                                                    </Row>
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <Form.Label>Object <Question/></Form.Label>
                                        </OverlayTrigger> 
                                        <Form.Control  name="object" type="text" value={values.object}  onChange = {handleChange} className={touched.object && errors.object ? "is-invalid" : null} />
                                        {touched.object && errors.object ? (
                                            <div className="error-message">{errors.object}</div>
                                        ): null}
                                    </Form.Group>
                                </Col>
                                <Col  >
                                    <Form.Group>
                                        <OverlayTrigger placement="right"
                                                overlay={
                                                <Popover>
                                                    <Popover.Title as="h3">Quantity</Popover.Title>
                                                    <Popover.Content>
                                                        <Row className="m-3">
                                                            In this field write the quantity of elements
                                                        </Row>
                                                        <Row className="m-3">
                                                        <strong className="mr-2">Example: </strong> 10.
                                                        </Row>
                                                    </Popover.Content>
                                                </Popover>
                                            }>
                                                <Form.Label>Quantity <Question/></Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control name="quantity" type="number" value={values.quantity} onChange = {handleChange} className={touched.quantity && errors.quantity ? "is-invalid" : null}/>
                                        {touched.quantity && errors.quantity ? (
                                            <div className="error-message">{errors.quantity}</div>
                                        ): null}
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row  className="justify-content-left">   
                                <Col>
                                    <Form.Group>
                                    <OverlayTrigger placement="right"
                                                overlay={
                                                <Popover>
                                                    <Popover.Title as="h3">Quantity</Popover.Title>
                                                    <Popover.Content>
                                                        <Row className="m-3">
                                                            In this field select category of elements
                                                        </Row>
                                                        <Row className="m-3">
                                                        <strong className="mr-2">Example: </strong> Books.
                                                        </Row>
                                                    </Popover.Content>
                                                </Popover>
                                            }>
                                                <Form.Label>Category <Question/></Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control as="select" name="category"  value={values.category} onChange = {handleChange} className={touched.category && errors.category ? "is-invalid" : null} >
                                        <option> </option>
                                        <option>arts and crafts</option>
                                        <option>automobile</option>
                                        <option>books</option>
                                        <option>computers</option>
                                        <option>electronics</option>
                                        <option>home and Kitchen</option>
                                        <option>apparels and clothing</option>
                                        <option>Industrial</option>
                                        <option>Sport elements</option>
                                        <option>Tools and Home repair</option>
                                        <option>Furniture</option>
                                        <option>Toys and Games</option>
                                        <option>Jewels and  luxury</option>
                                        </Form.Control>
                                        {touched.category && errors.category ? (
                                            <div className="error-message">{errors.category}</div>
                                        ): null}
                                    </Form.Group>
                                </Col>
                                <Col >
                                    <Form.Group>
                                    <OverlayTrigger placement="right"
                                                overlay={
                                                <Popover>
                                                    <Popover.Title as="h3">Value</Popover.Title>
                                                    <Popover.Content>
                                                        <Row className="m-3">
                                                            In this field write the values of objects
                                                        </Row>
                                                        <Row className="m-3">
                                                        <strong className="mr-2">Example: </strong> 1000.
                                                        </Row>
                                                    </Popover.Content>
                                                </Popover>
                                            }>
                                                <Form.Label>Value <Question/></Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control name="value" type="number" value={values.value} onChange = {handleChange} className={touched.value && errors.value ? "is-invalid" : null} />
                                        {touched.value && errors.value ? (
                                            <div className="error-message">{errors.value}</div>
                                        ): null}
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>                   
                                    <Form.Group>
                                    <OverlayTrigger placement="right"
                                                overlay={
                                                <Popover>
                                                    <Popover.Title as="h3">Description</Popover.Title>
                                                    <Popover.Content>
                                                        <Row className="m-3">
                                                            In this field write a small description of objects <strong className="ml-2">maximum 200 characters</strong>
                                                        </Row>
                                                        <Row className="m-3">
                                                        <strong className="mr-2">Example: </strong> it is books reds.
                                                        </Row>
                                                    </Popover.Content>
                                                </Popover>
                                            }>
                                                <Form.Label>Description <Question/></Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control name="description" as="textarea" value={values.description} onChange = {handleChange} className={touched.description && errors.description ? "is-invalid" : null} />
                                        {touched.description && errors.description ? (
                                            <div className="error-message">{errors.description}</div>
                                        ): null}
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Button type = "submit" className="col-lg-4 m-2" variant={"primary"}>add</Button>
                        </Card>
                    </Form>
                )}
                </Formik>
                <Col>
                <InventoryRendericer  elements = {elements} deleteObj = {deleteObj}></InventoryRendericer>
                </Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>handleToAxios(finalDate,initialDate,elements,spaceId,lenderId)}>save</Button>
        </Modal.Footer>
    </Modal>
)
}