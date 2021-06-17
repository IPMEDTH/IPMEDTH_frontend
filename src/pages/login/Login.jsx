import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import UrlService from "../../services/UrlService";
import './login.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Input from "../../components/input_field/Input"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
  }

	handleChange(event) {
		const name = event.target.name;
		this.setState({
			[name]: event.target.value
		});
	};

  handleSubmit(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.get(UrlService.getCookie())
    .then(response => {
      console.log(response);
      console.log({
  			email: this.state.email,
  			password: this.state.password
  		});

      axios.post(UrlService.login(), {
  			email: this.state.email,
  			password: this.state.password
  		})
  		.then((response) => {
        console.log(response);
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log("success");
        }
  		  // this.setState({ loading: false });
  		})
  		.catch((error) => {
        console.log(error);
  			if (error.response) {
          const status = error.response.status;
          console.log(status);
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
          {/* <div className="titlebar"></div> */}
          <form className="login__content__form" onSubmit= {this.handleSubmit}>
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
            />
            <input
              className="login__content__form__submit"
              type='submit'
              value='Login'
            />
          </form>
          <Link className="login__content__register" to="/register"> Maak nieuw account aan</Link>
          <Link className="login__content__forgotpassword" to="/forgotpassword">Wachtwoord vergeten?</Link>
        </main>
        <Footer />
      </section>
    )
  }
}

export default Login;
