import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer"
import HistoryList from "../../components/materialhistory/HistoryList"

class MaterialHistory extends React.Component {
  constructor (){
    super();

    this.state = {
      dataIsReturned: false,
    }
    this.HistoryListComponent = '';
  }

  getHistoryData = () => {
    axios.get(UrlService.History())
    .then((response) => {
      this.HistoryListComponent = <HistoryList history={response.data} updateList={this.getHistoryData}/>;
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

  componentDidMount = () =>{
    this.getHistoryData();
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
            <h2 className="inventory__content__header__title"> GESCHIEDENIS</h2>
            <div className="titlebar"></div>
            <p className="inventory__content__header__text"> Hier bevindt zich een actueel overzicht van alle bewerkingen op materialen door bezoekers </p>
          </header>
          <article className="inventory__content__wrapper__container">
            {this.state.dataIsReturned!==false ? this.HistoryListComponent : <h2> Loading... </h2>}
          </article>
        </main>
        <Footer />
      </div>
    );
  }
}

export default MaterialHistory;
