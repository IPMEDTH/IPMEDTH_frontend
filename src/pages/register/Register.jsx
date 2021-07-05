import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import UrlService from "../../services/UrlService";
import './register.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Input from "../../components/input_field/Input"


let checkPasswordMatch = (password, password_confirmation) => {
  return (password === password_confirmation);
}

let checkPasswordLength = password => {
  return password.length >= 8;
}

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      loading: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Changes value based on change in the input field
  handleChange(event) {
		const name = event.target.name;
		this.setState({
			[name]: event.target.value
		});
	}

  //Function that registers a user & logs in after registration
  handleSubmit(event) {
    event.preventDefault();
    axios.defaults.withCredentials = true;

    if (!checkPasswordLength(this.state.password)) {
      this.setState({error: 'Wachtwoord moet langer dan 8 tekens zijn'})
      return;
    } else
    if (!checkPasswordMatch(this.state.password, this.state.password_confirmation)) {
      this.setState({error: 'Wachtwoorden komen niet overeen'})
      return;
    }

    axios.get(UrlService.getCookie())
    .then(() => {
      this.setState({ loading: true });
      axios.post(UrlService.register(), {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      })
      .then(response => {
        this.setState({ loading: false });
        if(response.status === 201) {
          this.setState({ error: '' });
          this.props.history.push('/');
        } else
        if(response.data.error === "Already authenticated.") {
          this.setState({error: 'Er is al een andere gebruiker ingelogd'})
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        if (error.response) {
          if (error.status === 500 ) {
            if(error.response.data.exception === "Swift_TransportException") {
              this.setState({ error: "Er is een probleem met de mailserver, maar je account is wel aangemaakt!" });
            }
          }
          if (error.response.data.errors) {
            if (error.response.data.errors.email[0] === "The email has already been taken") {
              this.setState({ error: "Dit emailadres is al in gebruik!" });
            }
          } else {
            this.setState({ error: "Sorry, een onbekende error is opgetreden." });
            console.log(error.response.data.message);
          }
        }
      });
    })
  }

  render() {
    return (
      <section className='register'>
        <Header />
        <main className="register__content">
          <h2 className="register__content__title">REGISTREREN</h2>
          <form className="register__content__form" onSubmit= {this.handleSubmit}>
            <Input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              label="Naam"
              placeholder='Jan Smit'
            />
            <Input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              label="E-mailadres"
              placeholder='jantje@voorbeeld.nl'
            />
            <Input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              label="Wachtwoord"
              placeholder='Kaas1234'
              minlenght='8'
            />
            <Input
              type='password'
              name='password_confirmation'
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              label="Bevestig wachtwoord"
              placeholder='Kaas1234'
            />
            <div className="error">{this.state.error}</div>
            <input
              className="register__content__form__submit"
              type='submit'
              value='Registreer'
            />
          </form>
          <Link className="register__content__register" to="/login">Inloggen in plaats van registreren</Link>
        </main>
        <Footer />
      </section>
    )
  }
};

export default Register;
