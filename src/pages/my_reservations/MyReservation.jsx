import React from "react";
import './my_reservation.scss';
import triangle from '../../images/triangle_arrow.png';
import UrlService from "../../services/UrlService";
import axios from 'axios';
import { Redirect } from "react-router-dom";

import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import CardList from "./CardList";
import Footer from "../../components/footer/Footer";

class MyReservationPage extends React.Component {

  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <section className="reservation">
        <Header />
        <Link className="header__return" to="/">
          <p className="header__back">&larr; Ga terug naar vorige pagina</p>
        </Link>

        <article className="reservation__choice__content">
          <section>
            <h1 className="reservation__choice__subtitle">Jouw reserveringen</h1>
          </section>
          <section className="reservation__container">
            <CardList />
          </section>
        </article>

        <Footer />
      </section>
    );
  }
}

export default MyReservationPage;
