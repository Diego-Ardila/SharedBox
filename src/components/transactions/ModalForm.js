import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { postScore, postComment } from '../../utils/HTTPrequests';
import Rating from 'react-rating';
import swal from 'sweetalert';
import { Star, StarFill } from 'react-bootstrap-icons';
import { Formik, Field } from 'formik';
import * as Yup from "yup";

const base = {
  commentId: "modal-comment",
  ratingId: "modal-rating"
}

const modalSchema = Yup.object().shape({
  rating: Yup.number().typeError('Value must be a number').required("Required Field").max(5, 'The maximum value has to be 5').min(1,'The minimum value has to be 1'),
  comment: Yup.string().required("Required Field")    
})

function ModalForm(props) {
  const handleSubmit = (values, errors) => {
    swal("Good job!", "Response was successfully created!", "success").then(
      (value) => {
        props.onHide()
      }
    );
    
    /*async function postDataToDb () {
      try {
        const postScoreToDb = await postScore(values)
        const postCommentToDb = await postComment(values)
      } catch (err){
        console.log(err)
      }    
    }  
    postDataToDb()*/
  }
  return (
    <Formik
      initialValues={{ comment: "", rating: 0}}
      validationSchema={modalSchema}
      onSubmit={handleSubmit}>     
      {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setFieldValue

      }) => (
      <Container>
        <Form className="justify-content-center mt-3" onSubmit={handleSubmit}  noValidate >
        <Row>
          <Col sm={12} md={12} lg={12}>
          <Form.Group controlId={base.commentId}>
            <Form.Label>Comment</Form.Label>
            <Form.Control name="comment" type="text" placeholder="Enter Comment" onChange ={handleChange} value={values.comment} className={touched.comment && errors.comment ? "is-invalid" : null}  />
            {touched.comment && errors.comment ? (
              <div className="error-message">{errors.comment}</div>
            ): null}
          </Form.Group>  
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={12}>
          <Field name="rating" type="number" id="rating">
            {({ field: {value}, form: {setFieldValue} }) => (
              <>
              <Col>
                <label htmlFor={base.ratingId} className={touched.rating && errors.rating ? "is-invalid" : null} >Rating</label>
              </Col>
              <Col>
                <Rating  quiet emptySymbol={<Star size={30} />} fullSymbol={<StarFill size={30} />} initialRating={values.rating} onClick={(value) => setFieldValue("rating", value) }  />
                  <div className="float-right">
                    {values.rating}  
                  </div>                  
                  {touched.rating && errors.rating ? (
                    <div className="error-message">{errors.rating}</div>
                  ): null}
              </Col>                
              </>
            )}              
          </Field> 
          </Col>
        </Row>                               
          <Button variant="primary" size="md" type="submit" className="mt-5">
            Enviar
          </Button>  
        </Form>            
      </Container>          
      )} 
    </Formik> 
  );
};

export default ModalForm;