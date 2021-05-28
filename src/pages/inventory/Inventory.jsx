import React from "react";
import './inventory.css';
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Material from "../../components/material/Material";

// const MATERIALS_URL = 'http://localhost:8000/api/materials';
const MATERIALS_URL = 'http://localhost:8000/api/materials';

class Inventory extends React.Component {
  constructor (){
    super();

    this.state = {
      components: [],
    };
  }

  // This function gets called when the render() function gets called.
  componentDidMount = () =>{
    //Make the API GET request
    axios.get(MATERIALS_URL)
    .then((response) => {

      // this.setState({materials: Object.values(response.data)});
      const data = response.data;
      this.setState({materials: data.map(item => ({
        name: item.name,
        description: item.description,
        amount: item.amount,
        unit: item.unit,
        added_by: item.added_by,
        img_url: item.img_url
      }))});


      // console.log(data);
      // const item = data.map(attr => {
      //   material:{
      //     name: attr.name,
      //     description: attr.description,
      //     amount: attr.amount,
      //     unit: attr.unit,
      //     added_by: attr.added_by,
      //     img_url: attr.img_url
      //   }
      // })
      // this.setState({item});

      // console.log(this.state);
      // console.log(this.state.materials[0]);

      // this.state.materials.map(([name, description, amount, unit, added_by, img_url, ...rest]) => {
      //
      // })

    })
    .catch((error) => {
      console.log(error)
    })
  };

  // state = {
  //
  // }

  loop = (array) => {
  console.log("notnull");
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
    }
  }

  render(){
    return(
      <main>
        <Header />

          {console.log(this.state)}
          {this.state.materials!=null ?
            this.state.materials.map((item) => {
            <h1> acquired data </h1>
          }) : <h1> no data yet </h1>}
          {/*<MapMaterials materials={this.state.materials} updateFunct={this.loop}/>*/}

        <Footer />
      </main>
    );
  }
}

const MapMaterials = (props) => {
  console.log(props);
  if (props.materials) {
    return (
      <>
        {
          props.materials.map((item) => {
            console.log(item.name);
            <h1> what the fuck </h1>
          })
          // props.updateFunct(props.materials)
        }
      </>
     )
  }
  else {
    return (
      <p> loading... </p>
    )
  }

}

export default Inventory;
