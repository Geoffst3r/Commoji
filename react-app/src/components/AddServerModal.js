import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import AddServerForm from './AddServerForm.js';

function AddServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='add-server-button server-buttons' onClick={() => setShowModal(true)}>Add Server</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddServerForm/>
        </Modal>
      )}
    </>
  );
}

export default AddServerModal;
