import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import PhotosEditor from '../components/lenderAdminArea/photosEditor'

export default function LenderAdminArea () {

  const [showPhotos,setShowPhotos] = useState(false)

    return (
      <Container>
        <Button onClick={()=>setShowPhotos(true)}>Add or Delete Photos</Button>
        <PhotosEditor show={showPhotos} onHide={()=>setShowPhotos(false)} />
      </Container>
    )
}