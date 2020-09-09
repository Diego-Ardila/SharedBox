import React, {useState , useEffect} from 'react'
import {Modal,
        Row,
        Col,
        Button,
        Image,
        Container,
        Form,
        Card} from "react-bootstrap"
import { Formik } from 'formik';
import * as Yup from 'yup'


export default function InventoryForm(){
    
    const [object,setObject]=useState("")
    const [description,setDescription]= useState("")
    const [quantity,setQuantity]= useState(0)
    const [category, setCategory] = useState("")



    const handleSubmit = () =>{
        console.log(object)
    }
    
    const validatorForm = Yup.object().shape({
        object : Yup.string().required("Required Field"),
        description : Yup.string().required("Required Field"),
        category : Yup.string().required("Required Field"),
        quantity: Yup.number().min(1,"requiered minimun 1 object").required("Required Field")
    })
    
    return(
        <Formik initialValues={{object,description,quantity,category}} onSubmit={handleSubmit} validationSchema={validatorForm} >
        {({handleSubmit,handleChange,handleBlur,values,isValid,errors})=>(
            <Form>
                <Card className = "justify-content-center col-lg-12">
                    <Form.Row  className="justify-content-center">
                        <Col>
                            <Form.Group>
                                <Form.Label>object</Form.Label>
                                <Form.Control name="object" type="text" value={values.object} onChange = {handleChange}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control name="quantity" type="text" value={values.quantity} onChange = {handleChange}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row  className="justify-content-left">   
                        <Col>                   
                            <Form.Group>
                                <Form.Label>description</Form.Label>
                                <Form.Control name="description" type="text" value={values.description} onChange = {handleChange}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>category</Form.Label>
                                <Form.Control name="category" type="text" value={values.category} onChange = {handleChange}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Card>
            </Form>
        )}

    </Formik>
    
    )
}