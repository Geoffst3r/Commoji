import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import EditServerForm from './EditServerForm';

function EditServerModal() {
  const [showModal, setShowModal] = useState(false);

  const modalSetter = () => {
    setShowModal(false)
  };

  return (
    <>
      <button className='EditServerButton' onClick={() => setShowModal(true)}>Edit Server</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditServerForm modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default EditServerModal;
