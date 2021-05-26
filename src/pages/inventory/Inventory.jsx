import React from "react";
import './inventory.css';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class Inventory extends React.Component {
  constructor (){
    super();

    this.state = {

    };

    this.importImages = this.importImages.bind(this);
  }

  //This function is used to retrieve the location of certain files from a webpack directory given through 'r';
  importImages = (r) =>{
    return r.keys().map(r);
  };

  const images = this.importImages(require.context('../img/avatars', false, /\.(svg)/)); // Retrieve all images from '../img/avatars' and retrieve the webpack url

    // Set all the avatar items based of the images in the folder and store them in 'imageList'
    var imageList = images.map((image, index) =>{
      return(
        <label id={"avatar_label"+index} key={index}
        onMouseDown={() => this.toggleHover(index)}
        // onMouseLeave={this.toggleHover(index)}
        className="modal-main--label"
        >
        <img className="modal-main--label--image " id={"avatar"+index} width="75px" src={image} style={hoverStyle} alt="Avatar"/>
        <input className="modal-main--label--radio" onChange={this.handleSubmit} name="avatar_input" type="radio"></input>
        </label>
      );
    });


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
