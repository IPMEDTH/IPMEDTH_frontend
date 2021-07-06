import React from "react";
import './addmaterial.scss';
import icon from '../../images/add_black_24dp.svg';
import Modal from 'react-modal';

import AddMaterialForm from "../../components/addmaterialform/AddMaterialForm"
import AddMaterialSuccess from "../../components/addmaterialsuccess/AddMaterialSuccess"

class AddMaterial extends React.Component {
  constructor (){
    super();

    this.state = {
      showModal: false,
      showSuccessComponent: false,
    }

    this.AddMaterialForm = <AddMaterialForm showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} />;
    this.AddMaterialSuccess = <AddMaterialSuccess showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} />;
  }


  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false,
    showSuccessComponent: false })
    this.props.updateList();
  }

  handleShowSuccessComponent = (bool) => {
    this.setState({ showSuccessComponent: bool });
  }

  render() {
    return(
      <>
      <section className="addmaterial" onClick={this.handleOpenModal}>
        <article className="addmaterial__info">
          <h3 className="addmaterial__info__title"> Materiaal Toevoegen... </h3>
        </article>
        <figure className="inventory__content-item__info__figure">
          <img className="addmaterial__info__image" src={icon} alt="Add Material icon"></img>
        </figure>
      </section>

      <Modal
        isOpen={this.state.showModal}
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={this.state.CloseOnOverlayClick}
        ariaHideApp={false}
       >

      {this.state.showSuccessComponent===false ?
        this.AddMaterialForm
        :
        this.AddMaterialSuccess
      }
      </Modal>
      </>
    )
  }

}

export default AddMaterial;
