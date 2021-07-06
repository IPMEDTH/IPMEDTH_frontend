import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { connect } from "react-redux";

import Input from "../../components/input_field/Input"
import './forgotpassword.scss';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email
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

    const { email } = this.state;

    axios.get(UrlService.getCookie())
    .then(() => {
      axios.post(UrlService.forgotPassword(), { email })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log('Success');
            alert(response.data.message);
            this.props.history.push('/');
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response) {
            if (error.response.data.errors) {
              if (error.response.data.errors.email[0] === "We can't find a user with that email address.") {
                alert(error.response.data.errors.email[0])
              }
            } else {
              alert(error.response.data.message)
            }
          }
        })
    })
  };



  render() {
    return (
      <section className='forgotpassword'>
        <Header />
        <main className="forgotpassword__content">
          <h2 className="forgotpassword__content__title">Wachtwoord vergeten</h2>
          <form className="forgotpassword__content__form" onSubmit={this.handleSubmit}>
            <p>Vul hieronder je emailadres in, en als je een account hebt sturen we je een mailtje met een link om je wachtwoord te herstellen!</p>
            <Input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              label="E-mailadres"
              placeholder="jantje@voorbeeld.nl"
            />
            <input
              className="forgotpassword__content__form__submit"
              type='submit'
              value='Verzenden'
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

export default connect(mapStateToProps)(ForgotPassword);
