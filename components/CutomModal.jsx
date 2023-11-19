// components/CustomModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('html');

const CustomModal = ({ showModel, handleClose, children }) => {
    return (
        <Modal
            isOpen={showModel}
            onRequestClose={handleClose}
            contentLabel="Example Modal"
        >
            {children}
        </Modal>
    );
};

export default CustomModal;
