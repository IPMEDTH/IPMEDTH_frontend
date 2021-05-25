import React from "react";
import './DeviceSelection.scss';

import Header from "../../components/header/Header"
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

  cardClicked = (id) => {
    console.log(`Gekozen apparaat: ${id}`);
    window.localStorage.setItem('device', `${id}`);
    var lasercutter = window.localStorage.getItem('device');
    console.log(lasercutter);
    this.setState({
      redirect: "/reservation/"
    })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <section className="deviceselection">
        <Header />

        <article className="choice__content">
          <section>
            <h1 className="choice__subtitle">Van welk apparaat wilt u gebruik maken?</h1>
            <p className="choice__text">
              Bij het reserveren van een plek in het houtbewerkingslokaal valt dit onder een apparaat en werkplek, hierbij is het dus niet nodig voor u om ook een werkplek te reserveren.
              Bij andere apparaten zoals een lasersnijder of 3D printer krijgt u de keuze of u er ook een werkplek bij wilt.
            </p>
          </section>
          <section className="container opties">

            <CardList cardClicked = {this.cardClicked} />

          </section>
        </article>

        <Footer />
      </section>
    );
  }
}

export default DeviceSelectionPage;
