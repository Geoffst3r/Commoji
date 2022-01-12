import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import AddServerForm from './AddServerForm.js';

function AddServerModal() {
  const [showModal, setShowModal] = useState(false);

  const modalSetter = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className='add-server-button server-buttons' onClick={() => setShowModal(true)}>＋</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddServerForm modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default AddServerModal;
