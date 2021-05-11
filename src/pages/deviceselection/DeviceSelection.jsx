import React from "react";
import './DeviceSelection.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class DeviceSelectionPage extends React.Component {
  render() {
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
          
            <article className="optie">
              <section className="optie__knop" onClick = {this.onLasercutterClicked}>
                <p>Lasersnijder</p>
              </section>
            </article>

            <article className="optie">
              <section className="optie__knop" onClick = {this.on3dPrinterClicked}>
                <p>3D printer</p>
              </section>
            </article>

            <article className="optie">
              <section className="optie__knop" onClick = {this.onWoodWorkingClicked}>
                <p>Houtbewerkingslokaal</p>
              </section>
            </article>

            <article className="optie">
              <section className="optie__knop" onClick = {this.onWorkplaceClicked}>
                <p>Werkplek</p>
              </section>
            </article>

          </section>
        </article>

        <Footer />
      </section>
    );
  }
}

export default DeviceSelectionPage;
