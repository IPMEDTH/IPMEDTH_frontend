import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import UrlService from "../../services/UrlService";
import './account.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { DragHandle } from "@material-ui/icons";
import { connect } from "react-redux";
import { changeUser } from "../../redux/actions";

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

  render() {
    return (
      <section className='login'>
        <Header />
        <main className="login__content">
          <h2 className="login__content__title">INLOGGEN</h2>
          <pre>{ JSON.stringify(this.props.user, null, 4)}</pre>
          <button onClick={this.handleLogout}>Log uit</button>
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
