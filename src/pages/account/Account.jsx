import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";
import './account.scss';
import { Link } from "react-router-dom";

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { connect } from "react-redux";
import { changeUser } from "../../redux/actions";
import TokenItemList from "./TokenItemList";
import TokenCreator from "./TokenCreator";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
    // Bindings
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    axios.defaults.withCredentials = true;

    axios.get(UrlService.getCookie())
    .then(() => {
      axios.post(UrlService.logout())
  		.then(response => {
            console.log(response)
            this.props.dispatch(changeUser(""));
            this.props.history.push('/');
  		})
  		.catch((error) => {
        this.setState({ loading: false });
        if (error.response) {
          console.log(error.response)
        }
  		});
    });
  };

  handleVerifyEmail() {
    axios.defaults.withCredentials = true;

    axios.get(UrlService.getCookie())
    .then(() => {
      axios.post(UrlService.verifyEmail())
  		.then(response => {
            console.log(response)
            // this.props.dispatch(changeUser(""));
            // this.props.history.push('/');
  		})
  		.catch((error) => {
        // this.setState({ loading: false });
        if (error.response) {
          console.log(error.response)
        }
  		});
    });
  };

  render() {
    return (
      <section className='account'>
        <Header />
        <main className="account__content">
          <h2 className="account__content__title">ACCOUNT</h2>
          <div className="account__content__imgdiv">
            <figure className="account__content__imgfigure">
              <img className="account__content__img" src={this.props.user.image_url ? this.props.user.image_url : 'https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg'} alt="Profielfoto" />
            </figure>
          </div>
          <section>
            <h4>Naam</h4>
            <p>{this.props.user.name}</p>
            <h4>E-mailadres</h4>
            <p>{this.props.user.email} {this.props.user.email_verified_at ? '' : <input type="button" value="E-mailverificatie opnieuw versturen" onClick={this.handleVerifyEmail}/> }</p>
            <h4>Kennis</h4>
            <p>{this.props.user.knowledge ? this.props.user.knowledge : '-'}</p>
            <h4>Beschikbaarheid</h4>
            <p>{this.props.user.available ? this.props.user.available : '-'}</p>
            <h4>Genereer API Token</h4>
            <TokenCreator/>
            <TokenItemList/>
            {
              this.props.user.isadmin === "1" || this.props.user.isadmin === 1 ? <>
                <h4>Administratorpagina's</h4>
                <Link to="manageusers"><button>Beheer gebruikers</button></Link>
                <Link to="managereservations"><button>Beheer reserveringen</button></Link>
                <Link to="managelocations"><button>Beheer locaties en helpers</button></Link>
              </> : ''
            }
          </section>
          <button className="login__content__form__submit" onClick={this.handleLogout}>Log uit</button>
        </main>
        <Footer />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Account);
