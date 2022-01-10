import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import AddServer from './AddServerForm';

function AddServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Server</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddServer/>
        </Modal>
      )}
    </>
  );
}

export default AddServerModal;
