import React from "react";
import axios from 'axios';
import './login.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

// const POST_URL = "https://somewhere.com/api/login";
const POST_URL = 'http://localhost:8000/api/login';

// Main app
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
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
    this.setState({ loading: true });
		axios.post(POST_URL, {
			email: this.state.email,
			password: this.state.password
		})
		.then((response) => {
		  this.setState({ loading: false });
			this.setState({ error: '' });
		})
		//Error when provided e-mail not exists in database
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

  render() {
    return <div className='Modal'>
              <form onSubmit= { this.handleSubmit }>
                <Input type='text' name='username' onChange={this.handleChange} placeholder='username' />
                <Input type='password' name='password' onChange={this.handleChange} placeholder='password' />
                <input className="" type='submit' value='Login' />
              </form>
                <a href='#'>Forgot your password?</a>
           </div>
  }
}

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } onChange={this.props.handleChange} placeholder={ this.props.placeholder } required autoComplete='false'/>
              <label htmlFor={ this.props.name } ></label>
           </div>
  }

}

export default Login;
