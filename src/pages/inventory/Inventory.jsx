import React from "react";
import './inventory.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class Inventory extends React.Component {
  render(){
    return(
      <main>
        <Header />
          <p>inventory</p>
        <Footer />
      </main>
    );
  }
}

export default Inventory;
