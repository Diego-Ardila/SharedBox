import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {changePrice, changePublishAreaView, changeArea,
    changeLength,
    changeHeight,
    changeWidth,
    changeCity,
    changeAddress,
    changeDescription,
    changeTitle,
    changePhotos} from "../../actions/publishArea.actions"
import {postSpace, updateSpaceTag, postTag, postPhotosFiles} from "../../utils/HTTPrequests"
import {Container, Form, Row,  Button, InputGroup} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as Yup from "yup";
import swal from 'sweetalert'


const base= {
    priceId : "priceForm_price"
}

const FormSchema = Yup.object().shape({  
    price: Yup.number().typeError('Value must be a number').min(1,"Value must to be greater than 0").required('Required Field')
})

export default function PriceForm () {
    const dispatch = useDispatch() 
    const state = useSelector(state => state.publishAreaReducer)
    
    
    const files = state.photos
    const history = useHistory()

    const redirectBack = () => dispatch(changePublishAreaView(4))

    const customChange = (eventTarget, setValues, values, dispatch) => {
        let toUpdate = {...values}
        toUpdate[eventTarget.name] = eventTarget.value
        dispatch(changePrice(eventTarget.value))
        setValues(toUpdate)
    }
    
    const handleSubmit = async(values) => {
        try {
            const spaceId = await postSpace(state)
            Promise.all(state.tags.map( async ({name}) => {
                if(state.suggestions.some( suggestion => suggestion.name.toUpperCase() === name.toUpperCase())) return await updateSpaceTag(spaceId, name)   
                await postTag(spaceId, name)
            }))
            const data = new FormData();
            data.append('spaceId', spaceId)
            files.forEach(file => {
                data.append('file', file, file.name)
            });
            const postedPhotos = await postPhotosFiles(data)

            dispatch(changePublishAreaView(1))
            dispatch(changeArea(0))
            dispatch(changeWidth(0))
            dispatch(changeHeight(0))
            dispatch(changeLength(0))
            dispatch(changeCity(""))
            dispatch(changeAddress(""))
            dispatch(changeDescription(""))
            dispatch(changeTitle(""))
            dispatch(changePhotos([]))
            dispatch(changePrice(0))
            swal("Space Created!","Your space was created successfully","success")
            history.push("/lender/admin")
        } catch(err){
            console.dir(err)
            swal("Task failed!",`error: ${err.response.data.message}`,"error")
        }
    }

    return(
        <Formik 
        initialValues = {{price: 0}}
        validationSchema = {FormSchema}
        onSubmit = {handleSubmit} >   
        {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
        }) => (  
            <>            
            <Container>    
                <Row className="justify-content-center">
                    <h1>Register Price</h1>         
                </Row>
                <Row md={{span: 4, offset: 4}} lg={{span: 4, offset: 4}}>
                    <Button variant="primary" size="lg" onClick={redirectBack}>
                        <ArrowLeft />
                    </Button>
                </Row>
                <Row className="justify-content-center">                    
                    <Form className="justify-content-center mt-3" onSubmit={handleSubmit} noValidate>
                        <h3>Finally... lets talk about money:</h3>
                        <InputGroup>
                        <Form.Group controlId={base.priceId}>
                            <Form.Label>Expected Price</Form.Label>               
                            <Form.Control className={touched.price && errors.price ? "is-invalid" : null} name="price" type="text" placeholder="price" onChange ={(e) => customChange(e.target, setValues, values, dispatch)} value={values.price} />
                            {touched.price && errors.price ? (
                                <div className="error-message">{errors.price}</div>
                            ): null}
                        </Form.Group>  
                        </InputGroup>                     
                        <Button variant="primary" size="lg" type="submit">
                            Next
                        </Button>
                    </Form>        
                </Row>                     
            </Container>
            </>
        )}           
        </Formik>
        
    )
}
