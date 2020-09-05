import React, { useState } from 'react';
import ModalTransactions from './ModalTransactions';
import { Button } from 'react-bootstrap';

function TenantAdmin() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch modal
      </Button>
      <ModalTransactions show={modalShow} onHide={() => setModalShow(false)} />
      
    </>
  );
};

export default TenantAdmin;