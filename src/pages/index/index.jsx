import React from "react";
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import './index.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class IndexPage extends React.Component {

  checkUserRights = (user) => {
    return user.isadmin!==undefined && user.isadmin!=="0";
  }

  render() {
    return(
      <section className="index">
        <Header />
        <main className="index__content">
          <header className="index__content__header">
            <h2 className="index__content__header__title"> Welkom bij The Spacervering </h2>
            <p className="index__content__header__text"> Wat wil je doen? </p>
          </header>
          <div className="index__content__wrapper">
            <article className="index__content__selection">
                <NavLink exact className="index__content__selection-item" to="/deviceselection">
                  <h3 className="index__content__selection-item__title"> Reserveren </h3>
                </NavLink>
                <NavLink exact className="index__content__selection-item" to="/inventory">
                  <h3 className="index__content__selection-item__title"> Materiaal Voorraad </h3>
                </NavLink>
                <NavLink exact className="index__content__selection-item" to="/personnel">
                  <h3 className="index__content__selection-item__title"> Wie kan helpen? </h3>
                </NavLink>
                <NavLink exact className="index__content__selection-item" to="/my_reservations">
                  <h3 className="index__content__selection-item__title"> Jouw Reserveringen </h3>
                </NavLink>
                {this.checkUserRights(this.props.user)===false ?
                  null
                :
                  <NavLink exact className="index__content__selection-item" to="/materialhistory">
                    <h3 className="index__content__selection-item__title"> Materiaal History </h3>
                  </NavLink>
                }
            </article>
          </div>
        </main>

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

export default connect(mapStateToProps)(IndexPage);
