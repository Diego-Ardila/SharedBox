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
import swal from 'sweetalert'



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
    const [files,setFiles] = useState([])
    const hiddenFileInput = useRef()
    let newPhotosArray=[]
    

    const deletePhotos = async (photo) => {
      try{
        const newPhotos = photos.filter((photoDb)=> photoDb !== photo)
        const newFiles = files.filter(file=>{
          return file.name !== photo.name
        })
        dispatch(changePhotos(newPhotos))
        setFiles(newFiles)
        await deletePhoto(photo,space._id)
      }
      catch(err){
       console.dir(err)
      }
    }

    const handleChange = (e)=>{
      if(photos.length > 0) newPhotosArray=[...photos]
      Object.values(e.target.files)
            .forEach(file => {
                let fileObj= {
                              name: file.name,
                              url : URL.createObjectURL(file)
                              }
                filesToUpload.push(file);
                newPhotosArray.push(fileObj)
            })
      dispatch(changePhotos(newPhotosArray))
      setFiles(files.concat(filesToUpload))
    }

    const handleClick = ()=>{
      hiddenFileInput.current.click()
    }

    const handleSubmit =async (space,files)=>{
      if(files && files.length > 0){
        try{
          const data= new FormData()
          data.append('spaceId', space._id)
          files.forEach(file =>{
            data.append('file', file, file.name)
          })
          await postPhotosFiles(data)
          swal("Register successfully","Your photos were saved succesfully","success")
        }
        catch(err){
          swal("Updating photos error", "Something went wrong, please try again", "error")
        }
        setFiles([])
      }
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
                let img = photo || 'https://www.freeiconspng.com/uploads/no-image-icon-15.png';
                return (
                    <Col className="mb-3" sm={6} md={3} xl={3} >
                        <Photos>
                            <Image key={img} src={img.url ? img.url : img} fluid/>
                            <Button size="sm" onClick={()=> deletePhotos(photo)} className="position-absolute" >
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
          <Button onClick={() =>{handleSubmit(space,files); onHide()}}>Save</Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

