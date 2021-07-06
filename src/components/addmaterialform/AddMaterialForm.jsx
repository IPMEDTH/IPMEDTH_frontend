import React from "react";
import UrlService from "../../services/UrlService";
import axios from 'axios';
import { connect } from "react-redux";
import './addmaterialform.scss';

import YouAreNotAdmin from "../../components/youarenotadmin/YouAreNotAdmin"

class AddMaterialForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      amount: '',
      unit: '',
      location: '',
      image: '',
      isLoading: false,
    };
  }

  // TODO: add check for file upload
  checkIfFormFilled = () => {
    return (
      this.state.name !== ''  &&
      this.state.description !== ''  &&
      this.state.amount !== ''  &&
      this.state.unit !== ''  &&
      this.state.location !== ''
    )
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
    }
  }

  createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        image: e.target.result
      })
    };
    reader.readAsDataURL(file);
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.checkIfFormFilled() && !this.state.isLoading) {
      const { name, description, amount, unit, location, image } = this.state;
      this.setState({ isLoading: true });
      console.log(this.state);

      axios.defaults.withCredentials = true;
      axios.get(UrlService.getCookie())
      .then(response => {
        axios.post(UrlService.PostMaterial(), { name, description, amount, unit, location, image })
          .then((response) => {
            // TODO: ADD LOADING COMPONENT TO PREVENT USER FROM TAPPING SEND MORE THAN ONCE
            if (response.status === 200) {
              this.setState({ isLoading: false }); // quick fix for above TODO
              this.props.showSuccessComponent(true);
            }
          })
          .catch((error) => {
            console.log(error)
            this.setState({ isLoading: false });
          })
      })
    } else {
      alert("Whoops! Je bent een veld vergeten in te vullen. \nVul a.u.b. voor verzenden alle velden in.");
    }

  }

  checkUserRights = (user) => {
    return user.isadmin!==undefined && user.isadmin!=="0";
  }

  render() {

    return(
      <>
        <h2 className="addmaterial__title"> MATERIAAL TOEVOEGEN...</h2>
        <div className="addmaterial__titlebar"></div>
        {this.checkUserRights(this.props.user)===false ?
          <YouAreNotAdmin closeModal={this.props.closeModal}/>
        :
          <form className="addmaterial__form" method="POST">
            <label className="addmaterial__form__label" htmlFor="name">
              <input className="addmaterial__form__input" placeholder="Naam" type="text" name="name"   onChange={this.onChange} required autoComplete='false'/>
            </label>
            <label className="addmaterial__form__label" htmlFor="description">
              <input className="addmaterial__form__input" placeholder="Omschrijving" type="text" name="description"   onChange={this.onChange} required autoComplete='false'/>
            </label>
            <label className="addmaterial__form__label" htmlFor="amount">
              <input className="addmaterial__form__input" placeholder="Hoeveelheid" type="number" name="amount"  onChange={this.onChange} required autoComplete='false'/>
            </label>
            <label className="addmaterial__form__label" htmlFor="unit">
              <input className="addmaterial__form__input" placeholder="Eenheid" type="text" name="unit"   onChange={this.onChange} required autoComplete='false'/>
            </label>
            <label className="addmaterial__form__label" htmlFor="location">
              <input className="addmaterial__form__input" placeholder="Waar ligt het?" type="text" name="location"   onChange={this.onChange} required autoComplete='false'/>
            </label>
            <label className="addmaterial__form__label" htmlFor="image">
            <input className="addmaterial__form__input" placeholder="Hoe ziet het eruit?" type="file" name="image"   onChange={this.onChange} required autoComplete='false'/>
            </label>
            <section className="addmaterial__form__buttons">
              <div className="addmaterial__form__buttons__close" onClick={this.props.closeModal}></div>
              <button className="addmaterial__form__buttons__submit" type="submit" value="submit" onClick={this.submitForm}></button>
            </section>
          </form>
        }
      </>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(AddMaterialForm);
