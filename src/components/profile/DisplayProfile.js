import React, { useEffect, useState } from 'react';
import { Container, Card, Col, Image, Row } from 'react-bootstrap';
import {getDataUser} from '../../utils/HTTPrequests'

function DisplayProfile(props){
  
  let [name,setName]=useState(props.data.name);
  let [email,setEmail]=useState(props.data.email);
  let [phoneNumber,setPhoneNumber]=useState(props.data.phoneNumber);
  let [country,setCountry]=useState(props.data.country);    
  let [city,setCity]=useState(props.data.city||"");     
  let [averageScore,setAverageScore]=useState(props.data.averageScore||0);     
  const date = new Date(props.data.createdAt)
  let [createdAt,setCreatedAt]=useState(date.getUTCDay() + "-" + date.getMonth()+ "-" + date.getFullYear()||"");     

  useEffect( async () => {
    try{
      const userData = await getDataUser(props.typeUser)
      const date = new Date(userData.data.createdAt)
      setName(userData.data.name)
      setEmail(userData.data.email)
      setPhoneNumber(userData.data.phoneNumber)
      setCountry(userData.data.country)
      setCity(userData.data.city)
      setAverageScore(userData.data.averageScore)      
      setCreatedAt(date.getUTCDay() + "-" + date.getMonth() + "-" + date.getFullYear())
    }
    catch(error){
      console.dir(error)
    }
  }, [])

  return(
    <Container className="p-3">
      <Card className="p-3">
        <Row>
          <Col className="text-center">
            <Image src="https://imageog.flaticon.com/icons/png/512/16/16480.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" width={200} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-lg-5 text-md-right text-sm-center"> <label>Name:</label> </Col> <Col md className="col-lg-5 text-md-left text-sm-center"> <label>{name}</label> </Col>
        </Row>
        <Row  className="justify-content-center">
          <Col className="col-lg-5 text-md-right text-sm-center"><label>Email:</label></Col><Col md className="col-lg-5 text-md-left text-sm-center"><label>{email}</label></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-lg-5 text-md-right text-sm-center"><label>Phone:</label></Col><Col md className="col-lg-5 text-md-left text-sm-center"><label>{phoneNumber}</label></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-lg-5 text-md-right text-sm-center"><label>Average Score:</label></Col><Col md className="col-lg-5 text-md-left text-sm-center"><label>{averageScore}</label></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-lg-5 text-md-right text-sm-center"><label>Registered Since:</label></Col><Col md className="col-lg-5 text-md-left text-sm-center"><label>{createdAt}</label></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-lg-5 text-md-right text-sm-center"><label>About</label></Col><Col md className="col-lg-5 text-md-left text-sm-center"><label>{country} {city} </label></Col>
        </Row>
      </Card>
    </Container>
  );
}
export default DisplayProfile;