import React from "react";
import './inventory.scss';
import axios from 'axios';
import UrlService from "../../services/UrlService";
import Modal from 'react-modal';

import Header from "../../components/header/Header"
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer"
// import Material from "../../components/material/Material";
import MaterialList from "../../components/material/MaterialList"
import AddMaterial from "../../components/addmaterial/AddMaterial"
import AddMaterialForm from "../../components/addmaterialform/AddMaterialForm"
import AddMaterialSuccess from "../../components/addmaterialsuccess/AddMaterialSuccess"
import SearchBar from '../../components/searchbar/SearchBar';

// const MATERIALS_URL = 'http://localhost:8000/api/materials';
// const SEARCH_URL = 'http://localhost:8000/api/getmaterials/';

class Inventory extends React.Component {
  constructor (){
    super();

    this.state = {
      dataIsReturned: false,
      search_term: '',
      showModal: false,
      // CloseOnOverlayClick: true,
      showSuccessComponent: false,
    }
    this.ChildComponent = '';
    this.AddMaterialForm = <AddMaterialForm showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} />;
    this.AddMaterialSuccess = <AddMaterialSuccess showSuccessComponent={this.handleShowSuccessComponent} closeModal={this.handleCloseModal} />;

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
    // this.handleShowSuccessComponent = this.handleShowSuccessComponent.bind(this);
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false,
    showSuccessComponent: false })
    this.getMaterialsData();  // update material list
    // this.setState({ showSuccessComponent: false })
  }

  handleShowSuccessComponent = (bool) => {
    this.setState({ showSuccessComponent: bool });
  }
  // handleCloseOnOverlayClick={this.handleCloseOnOverlayClick}

  // switchModal = () => {
  //
  // }

  getMaterialsData = () => {
    axios.get(UrlService.Materials())
    .then((response) => {
      this.ChildComponent = <MaterialList materials={response.data} />;
      this.setState({dataIsReturned: true});
      console.log(response);

    })
    .catch((error) => {
      console.log(error)
      this.setState({dataIsReturned: false});
    })
  }

  updateInput = (event) => {
		const name = event.target.name;
		this.setState({
			[name]: event.target.value
		});
	}

  onCheck = (event) =>{
    event.preventDefault();
    this.searchForMaterials(this.state.search_term);
  }

  searchForMaterials = (term) => {
    console.log("searching for: " + term);
    if (term!=='') {
      axios.get(UrlService.Material(term))
      .then((response) => {
        this.ChildComponent = <MaterialList materials={response.data} />;
        this.setState({dataIsReturned: true});
        console.log(response);

      })
      .catch((error) => {
        console.log(error)
        this.setState({dataIsReturned: false});
      })
    } else {
      this.getMaterialsData();
      console.log("No term: getting normal data");
    }
  }

  componentDidMount = () =>{
    this.getMaterialsData();
  };

  render(){
    return(
      <div className="inventory__content">
        <Header />
        <Link className="header__return" to="/">
          <p className="header__back">&larr; Ga terug naar vorige pagina</p>
        </Link>
        <main className="inventory__content__wrapper">
          <header className="inventory__content__header">
            <h2 className="inventory__content__header__title"> MATERIALEN</h2>
            <p className="inventory__content__header__text"> Hier bevind een actueel overzicht van alle materialen aanwezig in The Space die gebruikt mogen worden. </p>
          </header>
          <SearchBar
            name="search_term"
            input={this.state.search_term}
            onChange={this.updateInput}
            onCheck={this.onCheck}
          />
          <AddMaterial
            onClick={this.handleOpenModal}
            />
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
          {this.state.dataIsReturned!==false ? this.ChildComponent : <h2> Loading... </h2>}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Inventory;
