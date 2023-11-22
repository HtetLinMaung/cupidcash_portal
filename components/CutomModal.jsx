// components/CustomModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('html');

const CustomModal = ({ showModel, handleClose, children }) => {
    const customStyles = {
        content: {
            width: 'auto',
            height: 'auto',
            maxWidth: '80%', // Optional: Set a max-width to limit the width of the modal
            maxHeight: '80%', // Optional: Set a max-height to limit the height of the modal
            margin: 'auto', // Center the modal
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            overflow: 'hidden'
        },
    };
    return (
        <Modal
            isOpen={showModel}
            onRequestClose={handleClose}
            contentLabel="Example Modal"
            style={customStyles}
        >
            {children}
        </Modal>
    );
};

export default CustomModal;
