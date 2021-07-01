import React from "react";
import './DeviceSelection.scss';

import Header from "../../components/header/Header";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CardList from "../../pages/deviceselection/CardList";
import Footer from "../../components/footer/Footer"
import { Redirect } from "react-router-dom";

class DeviceSelectionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  cardClicked = (id, title, amount) => {
    window.localStorage.setItem('location', `${title}`);
    window.localStorage.setItem('device', `${id}`);
    window.localStorage.setItem('places', `${amount}`);
    var lasercutter = window.localStorage.getItem('device');
    console.log(lasercutter);
    if (this.props.user !== '') {
      this.setState({
        redirect: "/reservation/"
      })
    } else {
      alert("Om te reserveren moet je inloggen!");
      this.setState({ redirect: "/login" });
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <section className="deviceselection">
        <Header />
        <Link className="header__return" to="/">
          <p className="header__back">&larr; Ga terug naar vorige pagina</p>
        </Link>

        <article className="deviceselection__choice__content">
          <section>
            <h1 className="deviceselection__choice__subtitle">Van welk apparaat wilt u gebruik maken?</h1>
            <p className="deviceselection__choice__text">
              Bij het reserveren van een apparaat valt dit onder een apparaat en werkplek, het dus niet nodig voor u om ook een losse werkplek te reserveren.
            </p>
          </section>
          <section className="deviceselection__container">

            <CardList cardClicked = {this.cardClicked} />

          </section>
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

export default connect(mapStateToProps)(DeviceSelectionPage);
