import React from "react";
import './inventory.css';
import axios from 'axios';
import UrlService from "../../services/UrlService";
import Modal from 'react-modal';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
// import Material from "../../components/material/Material";
import MaterialList from "../../components/material/MaterialList"
import AddMaterial from "../../components/addmaterial/AddMaterial"
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
    }
    this.ChildComponent = '';
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

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
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
           >


          </Modal>
          {this.state.dataIsReturned!==false ? this.ChildComponent : <h2> Loading... </h2>}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Inventory;
