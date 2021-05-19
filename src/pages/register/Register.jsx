import React from "react";
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import './register.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

// const REGISTER_URL = "https://somewhere.com/api/register";
// const LOGIN_URL = "https://somewhere.com/api/login";
const REGISTER_URL = 'http://localhost:8000/api/register';
const LOGIN_URL = 'http://localhost:8000/api/login';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
      redirect: false,
      loading: false,
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
    this.setState({ loading: true });
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
      .then((response) => {
  		  this.setState({ loading: false });
  			this.setState({ error: '' });
        this.setState({ redirect: true });
      })
    })
		//Error when provided e-mail or username that already exists in database
    .catch((error) => {
      this.setState({ loading: false });
      if (error.response) {
        const status = error.response.status;
  			if (status === 401) {
  				this.setState({ error: 'Username or password not recognised.' });
  			}
      }
    });
  }

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
                  <input className="" type='submit' value='Register' />
                </form>
                  <a href='#'>Forgot your password?</a>
      </section>
    );
  };
};

class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } onChange={this.props.handleChange} placeholder={ this.props.placeholder } required autoComplete='false'/>
              <label htmlFor={ this.props.name } ></label>
           </div>
  }
}

export default Register;
