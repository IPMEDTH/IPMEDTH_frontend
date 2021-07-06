import React from "react";
import './inventory.scss';
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer"
import MaterialList from "../../components/material/MaterialList"
// import AddMaterial from "../../components/addmaterial/AddMaterial"
import SearchBar from '../../components/searchbar/SearchBar';

class Inventory extends React.Component {
  constructor (){
    super();

    this.state = {
      dataIsReturned: false,
      search_term: '',
    }
    this.MaterialListComponent = '';
  }

  getMaterialsData = () => {
    axios.get(UrlService.Materials())
    .then((response) => {
      this.MaterialListComponent = <MaterialList materials={response.data} updateList={this.getMaterialsData}/>;
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
        this.MaterialListComponent = <MaterialList materials={response.data} updateList={this.getMaterialsData}/>;
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
          <article className="inventory__content__wrapper__container">
            {this.state.dataIsReturned!==false ? this.MaterialListComponent : <h2> Loading... </h2>}
          </article>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Inventory;
