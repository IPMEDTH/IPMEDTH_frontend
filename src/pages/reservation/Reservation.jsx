import React from "react";
import './reservation.scss';

import Card from "./Card";

import Header from "../../components/header/Header"
import CardList from "../../pages/reservation/CardList";
import Footer from "../../components/footer/Footer"

class ReservationPage extends React.Component {
  render() {
    return(
      <section className="reservation">
        <Header />

        <article className="reservation__choice__content">
          <section>
            <h1 className="reservation__choice__subtitle">Wanneer wil je aan de slag?</h1>
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

export default ReservationPage;
