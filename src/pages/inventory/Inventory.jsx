import React from "react";
import './inventory.css';
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
// import Material from "../../components/material/Material";
import MaterialList from "../../components/material/MaterialList"
import SearchBar from '../../components/searchbar/SearchBar';

// const MATERIALS_URL = 'http://localhost:8000/api/materials';
const SEARCH_URL = 'http://localhost:8000/api/getmaterials/';

class Inventory extends React.Component {
  constructor (){
    super();

    this.state = {
      dataIsReturned: false,
      search_term: '',
    }
    this.ChildComponent = '';
  }

  getMaterialsData = () => {
    axios.get(UrlService.Materials())
    .then((response) => {
      this.ChildComponent = <MaterialList materials={response.data} />;
      this.setState({dataIsReturned: true});
      console.log(this.ChildComponent);

    })
    .catch((error) => {
      console.log(error)
      this.setState({dataIsReturned: false});
    })
  }

  updateInput = (event) => {
		const name = event.target.name;
    // console.log(name + " " + event.target.value);
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
      axios.get(SEARCH_URL + term)
      .then((response) => {
        this.ChildComponent = <MaterialList materials={response.data} />;
        this.setState({dataIsReturned: true});
        console.log(this.ChildComponent);

      })
      .catch((error) => {
        console.log(error)
        this.setState({dataIsReturned: false});
      })
    } else {
      this.getMaterialsData();
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
          {this.state.dataIsReturned!==false ? this.ChildComponent : <h2> Loading... </h2>}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Inventory;
