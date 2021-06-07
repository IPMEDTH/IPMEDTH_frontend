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
    };
  }
  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm = (e) =>{

    e.preventDefault();
    const { name, description, amount, unit } = this.state;

    axios.defaults.withCredentials = true;
    axios.get(UrlService.getCookie())
    .then(response => {
      axios.post(UrlService.PostMaterial(), { name, description, amount, unit })
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
        <form className="addmaterial__form" method="POST">
          <label className="addmaterial__form__label" htmlFor="name">Naam
            <input className="addmaterial__form__input" placeholder="placeholder" type="text" name="name"   onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="description">Omschrijving
            <input className="addmaterial__form__input" placeholder="placeholder" type="text" name="description"   onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="amount">Hoeveelheid
            <input className="addmaterial__form__input" placeholder="placeholder" type="number" name="amount"  defaultValue="1" onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="unit">Eenheid
            <input className="addmaterial__form__input" placeholder="placeholder" type="text" name="unit"   onChange={this.onChange} />
          </label>
          <button className="addmaterial__form__submit" type="submit" value="submit" onClick={this.submitForm}> Voeg Materiaal Toe &#10151;</button>
          <button className="addmaterial__form__close">Close</button>
        </form>
      </>
    )
  }

}

export default AddMaterialForm;
