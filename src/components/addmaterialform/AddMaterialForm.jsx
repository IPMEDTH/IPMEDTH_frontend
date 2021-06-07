import React from "react";
import UrlService from "../../services/UrlService";
import axios from 'axios';
import './addmaterialform.css';

// const COOKIE_URL = 'http://localhost:8000/sanctum/csrf-cookie';

class AddMaterialForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      amount: '',
      unit: '',
      location: '',
    };
  }
  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm = (e) =>{

    e.preventDefault();
    const { name, description, amount, unit, location } = this.state;

    axios.defaults.withCredentials = true;
    axios.get(UrlService.getCookie())
    .then(response => {
      axios.post(UrlService.PostMaterial(), { name, description, amount, unit, location })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  render() {
    return(
      <>
        <h2 className="addmaterial__title"> MATERIAAL TOEVOEGEN...</h2>
        <div className="addmaterial__titlebar"></div>
        <form className="addmaterial__form" method="POST">
          <label className="addmaterial__form__label" htmlFor="name">
            <input className="addmaterial__form__input" placeholder="Naam" type="text" name="name"   onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="description">
            <input className="addmaterial__form__input" placeholder="Omschrijving" type="text" name="description"   onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="amount">
            <input className="addmaterial__form__input" placeholder="Hoeveelheid" type="number" name="amount"  onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="unit">
            <input className="addmaterial__form__input" placeholder="Eenheid" type="text" name="unit"   onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="location">
            <input className="addmaterial__form__input" placeholder="Waar ligt het?" type="text" name="location"   onChange={this.onChange} />
          </label>
          <section className="addmaterial__form__buttons">
            <div className="addmaterial__form__buttons__close" onClick={this.props.closeModal}></div>
            <button className="addmaterial__form__buttons__submit" type="submit" value="submit" onClick={this.submitForm}></button>
          </section>
        </form>
      </>
    )
  }

}

export default AddMaterialForm;
