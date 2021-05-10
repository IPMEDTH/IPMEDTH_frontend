import React from "react";
import './index.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class IndexPage extends React.Component {
  render() {
    return(
      <section className="index">
        <Header />
        <h1>DIT IS DE MAIN PAGE</h1>
        <Footer />
      </section>
    );
  }
}

export default IndexPage;
