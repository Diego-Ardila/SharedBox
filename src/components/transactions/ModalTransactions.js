import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalForm from './ModalForm';

function ModalTransactions(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rate your Space
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">        
        <ModalForm onHide={() => props.onHide()}/>
      </Modal.Body>
    </Modal>
  );   
    
}  

export default ModalTransactions