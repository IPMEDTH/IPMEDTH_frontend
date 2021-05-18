import React from "react";
import axios from 'axios';
import './login.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

// class Login extends React.Component {
//   render(){
//     return(
//       <main>
//         <Header />
//           <p>Login</p>
//         <Footer />
//       </main>
//     );
//   }
// }

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
  }

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


  // render() {
  //
  //   // let component = <Modal onSubmit={ this.handleSubmit } key='modal'/> : <ModalBack onClick={ this.handleRemount } key='bringitback'/>;
  //   let component = [<Modal onSubmit={ this.handleSubmit }/>];
  //
  //   return { component }
  // }

  render() {
    return <div className='Modal'>
              <form onSubmit= { this.handleSubmit }>
                <Input type='text' name='username' placeholder='username' />
                <Input type='password' name='password' placeholder='password' />
                <input className="" type='submit' value='Login' />
              </form>
                <a href='#'>Forgot your password?</a>
           </div>
  }
}

// class Modal extends React.Component {
//   render() {
//     return <div className='Modal'>
//               <form onSubmit= { this.props.onSubmit }>
//                 <Input type='text' name='username' placeholder='username' />
//                 <Input type='password' name='password' placeholder='password' />
//                 <input className="" type='submit' value='Login' />
//               </form>
//                 <a href='#'>Forgot your password?</a>
//            </div>
//   }
// }

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autoComplete='false'/>
              <label htmlFor={ this.props.name } ></label>
           </div>
  }

}

export default Login;
