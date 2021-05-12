import React from "react";
import './register.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class Register extends React.Component {
  render(){
    return(
      <main>
        <Header />
          <p>Register</p>
        <Footer />
      </main>
    );
  }
}

export default Register;
