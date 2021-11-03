import React from 'react';
import { Modal } from 'react-bootstrap';

class PopUpModal extends React.Component {

    confirm = () => {
        this.props.confirmDelete(this.props.deleteId)
        this.props.cancelDelete()
    }

    render() {
        return(
            <Modal.Dialog>
                <Modal.Header>
                    <h1>Are you sure you'd like to delete this round?{this.props.text}</h1>
                    <button className="toast-close" onClick={() => this.props.cancelDelete()}>&times;</button>
                </Modal.Header>
                <Modal.Body>
                    <button className="dialog-primary-btn" onClick={() => this.confirm()}>Delete</button>
                    <button className="dialog-cancel-btn" onClick={() => this.props.cancelDelete()}>Cancel</button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

export default PopUpModal;