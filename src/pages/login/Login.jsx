import React from "react";
import axios from 'axios';
import './login.css';
import api from '../../assets/api'

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Input from "../../components/input_field/Input"

// const LOGIN_URL = "https://somewhere.com/api/login";
const LOGIN_URL = 'http://127.0.0.1:8000/login';

// Main app
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
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
    // console.log(this.state.password);
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8000/sanctum/csrf-cookie')
    .then(response => {
      // let cookies = document.cookie.split("=");
      // console.log(cookies); // []
      // let token = cookies[1];
      // console.log(token); // undefined
      // console.log(response.headers); // Object { "cache-control": "no-cache, private" }
      console.log(response);
      console.log({
  			email: this.state.email,
  			password: this.state.password
  		});
      axios.post("http://localhost:8000/login", {withCredentials: true}, {
  			email: this.state.email,
  			password: this.state.password
  		})
  		.then((response) => {
        console.log(response);
  		  // this.setState({ loading: false });
  			// this.setState({ error: '' });
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
    return <div className='Modal'>
              <form onSubmit= { this.handleSubmit }>
                <Input type='text' name='email' value={this.state.email} onChange={this.handleChange} placeholder='email' />
                <Input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='password' />
                <input className="" type='submit' value='Login' />
              </form>
                <a href='#'>Forgot your password?</a>
           </div>
  }
}

export default Login;
