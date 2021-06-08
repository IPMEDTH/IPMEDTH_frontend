import React from "react";
import './addmaterialsuccess.css';

// const COOKIE_URL = 'http://localhost:8000/sanctum/csrf-cookie';

class AddMaterialSuccess extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return(
      <section id="materialsform-success" className="addmaterial__form__success">
        <h2 className="addmaterial__title"> MATERIAAL TOEVOEGEN...</h2>
        <div className="addmaterial__titlebar"></div>
        <p className="addmaterial__form__success__text"> Uw materiaal is aan de voorraad toegevoegd! </p>
        <div className="addmaterial__form__success__close" onClick={this.props.closeModal}></div>
      </section>
    )
  }

}

export default AddMaterialSuccess;
