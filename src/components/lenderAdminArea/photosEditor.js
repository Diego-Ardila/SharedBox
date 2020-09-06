import React, {useRef , useState} from "react"
import {Modal,
        Row,
        Col,
        Button,
        Image,
        Container} from "react-bootstrap"
import {useSelector,useDispatch} from 'react-redux'
import styled from "styled-components"
import { Trash } from 'react-bootstrap-icons';
import {changePhotos} from '../../actions/publishArea.actions'
import {postPhotosFiles} from "../../utils/HTTPrequests"


const Photos = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display:flex;
    margin-bottom: 5px;
`
const AddPhotos = styled.button`
    color: white;
    text-align: center;
    background-color: #246bf0;
    border: solid white;
    margin: auto;
    height: 50px;
    width: 50px;
    border-radius: 15px;
` 



export default function PhotosEditor({spaceId,show,onHide}) {


    const photos = useSelector(state => state.publishAreaReducer.photos)
    const filesToUpload = []
    const hiddenFileInput = useRef()
    const dispatch = useDispatch()
    let newPhotosArray=[]

    const deletePhoto = (photo) => {
      return ()=>{
      const newPhotos = photos.filter((photoDb)=>{
         return photoDb !== photo
        })
        dispatch(changePhotos(newPhotos))
      }
    }

    const handleChange = (e)=>{
      if(photos.length > 0) newPhotosArray=[...photos]

      Object.values(e.target.files).forEach(file => {filesToUpload.push(file); newPhotosArray.push(URL.createObjectURL(file))})
      dispatch(changePhotos(newPhotosArray))
    }

    
    const handleClick = ()=>{
      hiddenFileInput.current.click()
    }

    const handleSubmit = ()=>{
      const data= new FormData()
      data.append("spaceId",spaceId)
      filesToUpload.forEach(file =>{
        data.append('file', file, file.name)
      })
       postPhotosFiles(data)
    }

    return (
      <Modal show= {show} onHide= {onHide} size="xl" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Your Space's Photos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true" className="show-grid">
          <Container>
            <Row >
              {photos && photos.map(photo =>{
                return (
                    <Col className="mb-3" sm={6} md={3} xl={3} >
                        <Photos>
                            <Image key={photo} src={photo} fluid/>
                            <Button size="sm" onClick={deletePhoto(photo)} className="position-absolute" >
                                <Trash/>
                            </Button>
                        </Photos>
                    </Col>)
              })}
              <Col sm={4} md={1} xl={1} >
                <Photos>
                  <input ref={hiddenFileInput} style={{display:"none"}} type="file" accept="image/*" multiple = {true} onChange ={handleChange} ></input>
                  <AddPhotos title="Add a new picture " onClick={handleClick} >+</AddPhotos>
                </Photos>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

