import React from "react";

import './manageusers.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import UserCardList from "./UserCardList";

const ManageUsers = props => {
  return (
    <section className='manageusers'>
      <Header />
      <main className="manageusers__content">
        <h2 className="manageusers__content__title">GEBRUIKERS</h2>
        <UserCardList />
      </main>
      <Footer />
    </section>
  )
}

export default ManageUsers;
