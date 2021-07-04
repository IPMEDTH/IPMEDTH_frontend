import React from "react";
// import UrlService from "../../services/UrlService";
import Modal from 'react-modal';

import EditMaterialForm from "../editmaterialform/EditMaterialForm";
import EditMaterialSuccess from "../editmaterialsuccess/EditMaterialSuccess";

class EditMaterialModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // itemId: this.props.itemId,
      // name: this.props.name,
      // description: this.props.description,
      // amount: this.props.amount,
      // unit: this.props.unit,
      // added_by: this.props.added_by,
      // location: this.props.location,
      // img_url: this.props.img_url,
      showModal: false,
      showSuccessComponent: false,
      isAdmin: false,
    };
    this.EditMaterialForm = <EditMaterialForm showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} materialAttributes={this.props.materialAttributes} />;
    this.EditMaterialSuccess = <EditMaterialSuccess showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} />;
  }

  handleShowSuccessComponent = (bool) => {
    this.setState({ showSuccessComponent: bool });
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false,
    showSuccessComponent: false })
    // this.getMaterialsData();  // update material list
    this.props.updateList();
    // console.log(this.props);
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
      <p onClick={this.handleOpenModal}> test </p>
      </>
    )
  }

}

export default EditMaterialModal;
