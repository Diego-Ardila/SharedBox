import React from "react"
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import {useSelector, useDispatch} from "react-redux"
import {changePhotos, changePublishAreaView} from "../../actions/publishArea.actions"
import {Container, Form, Row,  Button} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as Yup from "yup";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const base = {
    formClass : "photoForm",
    uploadId : "photoUpload"
}

const FormSchema = Yup.object().shape({  
    files: Yup.array().required("Required Field").min(1,"At least one photo is required").max(5,"The maximum amount of photos allowed are 5")
})

export default function PhotosUploadForm () {
    const dispatch = useDispatch()
    const photos = useSelector(state => state.publishAreaReducer.photos)
    const arrFiles = []
    
    const handleSubmit = (values) => {
        let { files } = values
        files.forEach(file =>{
            arrFiles.push(file.file);
        })          
        dispatch(changePhotos(arrFiles))   
        dispatch(changePublishAreaView(5))
    }

    const redirectBack = () => dispatch(changePublishAreaView(2))
    
    return(
        <Formik 
        initialValues = {{files: photos}}
        validationSchema = {FormSchema}
        onSubmit = {handleSubmit} >   
        {({
        handleSubmit, handleChange, values, touched, isValid, errors, setFieldValue
        }) => (  
            <>            
            <Container>    
                <Row className="justify-content-center">
                    <h1>Register Photos</h1>         
                </Row>
                <Row md={{span: 4, offset: 4}} lg={{span: 4, offset: 4}}>
                    <Button variant="primary" size="lg" onClick={redirectBack}>
                        <ArrowLeft />
                    </Button>
                </Row>
                <Row className="justify-content-center">                    
                    <Form className="justify-content-center mt-3" onSubmit={handleSubmit} noValidate>
                        <h3>Share some photos of your space! 
                            It will be mote appealing for people looking where to store their things
                        </h3>
                        <Form.Group controlId={base.uploadId}>
                            <FilePond
                                files={values.files}
                                onupdatefiles={fileItems => setFieldValue("files", fileItems)}
                                allowMultiple={true}
                                maxFiles={3}
                                name="files"
                                labelIdle='Drag & Drop your files or Browse'
                            />
                            {touched.files && errors.files ? (
                                <div className="error-message">{errors.files}</div>
                            ): null}
                        </Form.Group>                      
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
