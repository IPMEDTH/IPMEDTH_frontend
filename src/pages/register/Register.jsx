import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";
import './register.scss';

// import Header from "../../components/header/Header"
// import Footer from "../../components/footer/Footer"
import Input from "../../components/input_field/Input"


let checkPasswordMatch = (password, password_confirmation) => {
  return (password === password_confirmation);
}

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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
    if (!checkPasswordMatch(this.state.password, this.state.password_confirmation)) {
      console.log("password does not match");
      return;
    }
    axios.get(UrlService.getCookie())
    .then(response => {
      axios.post(UrlService.register(), {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        })
      .then((response) => {
        axios.post(UrlService.login(), {
          email: this.state.email,
          password: this.state.password
        })
        // .then((response) => {
    		//   this.setState({ loading: false });
    		// 	this.setState({ error: '' });
        //   this.setState({ redirect: true });
        // })
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          const status = error.response.status;
          console.log(status);
        }
      });
    })
  }

  render(){

    return (
      <section className='register'>
        <h2 className="login__title"> REGISTREREN </h2>
        <div className="titlebar"></div>
        <form className="register__form" onSubmit= { this.handleSubmit }>
          <Input type='text' name='name' onChange={this.handleChange} placeholder='name' />
          <Input type='text' name='email' onChange={this.handleChange} placeholder='e-mail' />
          <Input type='password' name='password' onChange={this.handleChange} placeholder='password' />
          <Input type='password' name='password_confirmation' onChange={this.handleChange} placeholder='confirm password' />
          <input className="register__form__submit" type='submit' value='Register' />
        </form>
      </section>
    );
  };
};

export default Register;
