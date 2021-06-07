import React from "react";
import UrlService from "../../services/UrlService";
import axios from 'axios';
import './addmaterialform.css';

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

    axios.post('http://localhost:8000/api/postmaterial', { name, description, amount, unit })
      .then((result) => {
        console.log(result);
      });
  }

  render() {
    return(
      <>
        <form className="addmaterial__form" method="POST">
          <label className="addmaterial__form__label" htmlFor="name">Naam
            <input className="addmaterial__form__input" placeholder="placeholder" type="text" name="name"  defaultValue="default value" onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="description">Omschrijving
            <input className="addmaterial__form__input" placeholder="placeholder" type="text" name="description"  defaultValue="default value" onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="amount">Hoeveelheid
            <input className="addmaterial__form__input" placeholder="placeholder" type="number" name="amount"  defaultValue="1" onChange={this.onChange} />
          </label>
          <label className="addmaterial__form__label" htmlFor="unit">Eenheid
            <input className="addmaterial__form__input" placeholder="placeholder" type="text" name="unit"  defaultValue="default value" onChange={this.onChange} />
          </label>
          <button className="addmaterial__form__submit" type="submit" value="submit" onClick={this.submitForm}> Voeg Materiaal Toe &#10151;</button>
          <button className="addmaterial__form__close">Close</button>
        </form>
      </>
    )
  }

}

export default AddMaterialForm;
