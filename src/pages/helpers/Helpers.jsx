import React from "react";
import './helpers.scss';
import UrlService from "../../services/UrlService";
import axios from 'axios';
import { connect } from "react-redux";

import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import PersonList from "./PersonList";
import Footer from "../../components/footer/Footer";


class HelpersPage extends React.Component {

  render() {
    return(
      <section className="helpers">
        <Header />
        <Link className="header__return" to="/">
          <p className="header__back">&larr; Ga terug naar vorige pagina</p>
        </Link>

        <article className="helpers__content">
          <section>
            <h1 className="reservation__choice__subtitle">Wij zijn er om je te helpen!</h1>
          </section>
          <PersonList />
        </article>

        <Footer />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(HelpersPage);
