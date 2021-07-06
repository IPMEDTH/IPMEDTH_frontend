import React from "react";

import './managereservations.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ReservationCardList from "./ReservationCardList";

const ManageReservations = props => {
  return (
    <section className='managereservations'>
      <Header />
      <main className="managereservations__content">
        <h2 className="managereservations__content__title">RESERVERINGEN</h2>
        <ReservationCardList/>
      </main>
      <Footer />
    </section>
  )
}

export default ManageReservations;
