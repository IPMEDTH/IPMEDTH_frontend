import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { connect } from "react-redux";
import queryString from 'query-string';

import Input from "../../components/input_field/Input"
import './resetpassword.scss';

let checkPasswordMatch = (password, password_confirmation) => {
  return (password === password_confirmation);
}

let checkPasswordLength = password => {
  return password.length >= 8;
}

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      token: queryString.parse(this.props.location.search).token,
      error: ''
    }
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({	[event.target.name]: event.target.value });
	};

  handleSubmit(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    if (!checkPasswordLength(this.state.password)) {
      this.setState({error: 'Wachtwoord moet langer dan 8 tekens zijn'})
      return;
    } else
    if (!checkPasswordMatch(this.state.password, this.state.password_confirmation)) {
      this.setState({error: 'Wachtwoorden komen niet overeen'})
      return;
    }

    const { email, password, password_confirmation, token } = this.state;

    axios.get(UrlService.getCookie())
    .then(() => {
      axios.post(UrlService.resetPassword(), { email, password, password_confirmation, token })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            alert(response.data.message);
            this.props.history.push('/login');
          }
        })
        .catch((error) => {
          console.log(error)
          alert(error.response.data.message);
        })
    })
  };



  render() {
    return (
      <section className='resetpassword'>
        <Header />
        <main className="resetpassword__content">
          <h2 className="resetpassword__content__title">Wachtwoord herstellen</h2>
          <form className="resetpassword__content__form" onSubmit={this.handleSubmit}>
            <Input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              label="E-mailadres"
              placeholder="jantje@voorbeeld.nl"
            />
            <Input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              label="Wachtwoord"
              placeholder="Kaas1234"
            />
            <Input
              type='password'
              name='password_confirmation'
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              label="Bevestig wachtwoord"
              placeholder="Kaas1234"
            />
            <div className="error">{this.state.error}</div>
            <input
              className="resetpassword__content__form__submit"
              type='submit'
              value='Opslaan'
            />
          </form>
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

export default connect(mapStateToProps)(ResetPassword);
