import React from "react";
import './editmaterial.scss';
import Modal from 'react-modal';

import EditMaterialForm from "../editmaterialform/EditMaterialForm";
import EditMaterialSuccess from "../editmaterialsuccess/EditMaterialSuccess";

class EditMaterialModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showSuccessComponent: false,
    };
    this.EditMaterialForm = <EditMaterialForm showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} materialAttributes={this.props.materialAttributes} />;
    this.EditMaterialSuccess = <EditMaterialSuccess showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} />;
  }

  handleShowSuccessComponent = (bool) => {
    this.setState({ showSuccessComponent: bool });
  }

  handleOpenModal = (e) => {
    e.stopPropagation();
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false,
    showSuccessComponent: false })
    this.props.updateList();  // update material list
    this.props.stockCheck();
  }

  render() {
    return(
      <>
      <Modal
        isOpen={this.state.showModal}
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={this.state.CloseOnOverlayClick}
        ariaHideApp={false}
       >

      {this.state.showSuccessComponent===false ?
        this.EditMaterialForm
        :
        this.EditMaterialSuccess
      }
      </Modal>
      <button className="editmaterial__button" onClick={this.handleOpenModal} />
      </>
    )
  }

}

export default EditMaterialModal;
