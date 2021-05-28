import React from "react";
import './inventory.css';
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
// import Material from "../../components/material/Material";
import MaterialList from "../../components/material/MaterialList"

// const MATERIALS_URL = 'http://localhost:8000/api/materials';
const MATERIALS_URL = 'http://localhost:8000/api/materials';

class Inventory extends React.Component {
  constructor (){
    super();

    this.state = {
      dataIsReturned: false,
    }
    this.ChildComponent = null;
  }

  // This function gets called when the render() function gets called.
  componentDidMount = () =>{
    //Make the API GET request
    axios.get(MATERIALS_URL)
    .then((response) => {

      // this.setState({materials: Object.values(response.data)});
      // const data = response.data;
      // this.setState({materials: data.map(item => ({
      //   name: item.name,
      //   description: item.description,
      //   amount: item.amount,
      //   unit: item.unit,
      //   added_by: item.added_by,
      //   img_url: item.img_url
      // }))});

      // let object = await import("../../components/material/Material")
      this.ChildComponent = <MaterialList materials={response.data} />;
      this.setState({dataIsReturned: true});
      console.log(this.ChildComponent);

    })
    .catch((error) => {
      console.log(error)
    })
  };

  render(){
    return(
      <main>
        <Header />
          {this.dataIsReturned!==null ? this.ChildComponent : <h1> Loading </h1>}
        <Footer />
      </main>
    );
  }
}

export default Inventory;
