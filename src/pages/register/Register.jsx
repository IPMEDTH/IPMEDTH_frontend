import React from "react";
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import './register.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Input from "../../components/input_field/Input"

// const REGISTER_URL = "https://somewhere.com/api/register";
// const LOGIN_URL = "https://somewhere.com/api/login";
const REGISTER_URL = 'http://api.ipmedth.meulen.dev/register';
const LOGIN_URL = 'http://api.ipmedth.meulen.dev/login';


let checkPasswordMatch = (password, conf_password) => {
  return (password == conf_password);
}

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      conf_password: '',
      redirect: false,
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
    if (!checkPasswordMatch(this.state.password, this.state.conf_password)) {
      console.log("password does not match");
      return;
    }
    axios.post(REGISTER_URL, {
        username:this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
    .then((response) => {
      this.setState({ error: '' });
      axios.post(LOGIN_URL, {
        email: this.state.email,
        password: this.state.password
      })
      // .then((response) => {
  		//   this.setState({ loading: false });
  		// 	this.setState({ error: '' });
      //   this.setState({ redirect: true });
      // })
    })
		//Error when provided e-mail or username that already exists in database
    .catch((error) => {
      console.log(error);
      if (error.response) {
        const status = error.response.status;
        console.log(status);
      }
    });
  }
  // status 419: no reason phrase
  // Cookie “laravel_session” has been rejected for invalid domain.

  render(){
    const { redirect } = this.state;

    // Redirects to dashboard after registration
    if (redirect) {
      return <Redirect to="/"/>
    }

    return (
      <section className='Modal'>
                <form onSubmit= { this.handleSubmit }>
                  <Input type='text' name='username' onChange={this.handleChange} placeholder='username' />
                  <Input type='text' name='email' onChange={this.handleChange} placeholder='e-mail' />
                  <Input type='password' name='password' onChange={this.handleChange} placeholder='password' />
                  <Input type='password' name='conf_password' onChange={this.handleChange} placeholder='password' />
                  <input className="" type='submit' value='Register' />
                </form>
                  <a href='#'>Forgot your password?</a>
      </section>
    );
  };
};

export default Register;
