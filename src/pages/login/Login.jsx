import React from "react";
import './login.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class Login extends React.Component {
  render(){
    return(
      <main>
        <Header />
          <p>Login</p>
        <Footer />
      </main>
    );
  }
}

export default Login;
