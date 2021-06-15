import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";
import './login.scss';

// import Header from "../../components/header/Header"
// import Footer from "../../components/footer/Footer"
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
    return <section className='login'>
              <h2 className="login__title"> INLOGGEN </h2>
              <div className="titlebar"></div>
              <form className="login__form" onSubmit= { this.handleSubmit }>
                <Input type='text' name='email' value={this.state.email} onChange={this.handleChange} placeholder='email' />
                <Input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='password' />
                <input className="login__form__submit" type='submit' value='Login' />
              </form>
           </section>
  }
}

export default Login;
