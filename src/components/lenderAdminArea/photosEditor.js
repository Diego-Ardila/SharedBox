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
import {postPhotosFiles, deletePhoto} from "../../utils/HTTPrequests"


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



export default function PhotosEditor({space,show,onHide}) {

    const dispatch = useDispatch()
    let photos = useSelector(state=> state.publishAreaReducer.photos)
    let filesToUpload = []
    const [files,setFiles] = useState()
    const hiddenFileInput = useRef()
    let newPhotosArray=[]
    

    const deletePhotos = async (photo) => {
      try{
        const newPhotos = photos.filter((photoDb)=> photoDb !== photo)
        dispatch(changePhotos(newPhotos))
        const result = await deletePhoto(photo,space._id)
        console.log(result)
      }
      catch(err){
        console.dir(err)
      }
    }

    const handleChange = (e)=>{
      console.log(photos)
      if(photos.length > 0) newPhotosArray=[...photos]

      Object.values(e.target.files).forEach(file => {filesToUpload.push(file); newPhotosArray.push(URL.createObjectURL(file))})
      dispatch(changePhotos(newPhotosArray))
      setFiles(filesToUpload)
    }

    
    const handleClick = ()=>{
      hiddenFileInput.current.click()
    }

    const handleSubmit =async (space)=>{
      console.log(files)
      console.log(space)
      const data= new FormData()
      data.append('spaceId', space._id)
      files.forEach(file =>{
        data.append('file', file, file.name)
      })
      await postPhotosFiles(data)
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
                            <Button size="sm" onClick={()=> deletePhotos(photo) } className="position-absolute" >
                                <Trash/>
                            </Button>
                        </Photos>
                    </Col>)
              })}
              <Col sm={4} md={1} xl={1} >
                <Photos>
                  <input ref={hiddenFileInput} style={{display:"none"}} type="file" accept="image/*" multiple = {true} onChange ={handleChange} ></input>
                  <AddPhotos title="Add a new picture " onClick={()=> handleClick()} >+</AddPhotos>
                </Photos>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSubmit(space)}>Save</Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

