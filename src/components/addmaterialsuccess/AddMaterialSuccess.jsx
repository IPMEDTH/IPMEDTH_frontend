import React from "react";
import './addmaterialsuccess.scss';

class AddMaterialSuccess extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return(
      <section className="addmaterial__success">
        <h2 className="addmaterial__title"> MATERIAAL TOEVOEGEN...</h2>
        <div className="addmaterial__titlebar"></div>
        <p className="addmaterial__success__text"> Uw materiaal is aan de voorraad toegevoegd! </p>
        <div className="addmaterial__success__close" onClick={this.props.closeModal}></div>
      </section>
    )
  }

}

export default AddMaterialSuccess;
