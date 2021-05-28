import React from "react";
import './inventory.css';
import axios from 'axios';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

const MATERIALS_URL = 'http://localhost:8000/api/materials';
// const MATERIALS_URL = 'http://localhost:8000/api/materials';

class Inventory extends React.Component {
  constructor (){
    super();

    this.state = {
      materials: [],
    };
  }

  mapMaterials = () => {
    console.log("materials function called");
    for (let i = 0; i < this.state.materials.length; i++) {
      this.state.materials[i].map(([name, description, amount, unit, added_by, img_url, ...rest]) => {
        console.log(this.state.materials[i]);
        return (
         <>
           <p> {name}</p>
           <p> {description}</p>
           <p> {amount}</p>
           <p> {unit}</p>
           <p> {added_by}</p>
           <p> {img_url}</p>
         </>
        )
      })
    }
  }

  // This function gets called when the render() function gets called.
  componentDidMount = () =>{
    //Make the API GET request
    axios.get(MATERIALS_URL)
    .then((response) => {
      //Retrieve the current set Avatar of the user in the DB and set it in state.
      this.setState({materials: Object.values(response.data)});
      console.log(this.state.materials[0]);
    });
  };

  render(){
    return(
      <main>
        <Header />

          { this.mapMaterials }

        <Footer />
      </main>
    );
  }
}

export default Inventory;
