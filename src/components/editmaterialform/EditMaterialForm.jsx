import React from "react";
import UrlService from "../../services/UrlService";
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class EditMaterialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      description: '',
      amount: '',
      unit: '',
      location: '',
      image: '',
      isLoading: false,
      redirect: false,
    };
  }

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
    console.log(e.target.value);
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
    if (this.props.user === ''){
      console.log("Niet ingelogd!");
      alert("Om te de voorraad aan te passen moet je ingelogd zijn!");
      this.setState({ redirect: "/login" });
      return;
    }
    if (this.checkIfFormFilled() && !this.state.isLoading) {
      const { id, name, description, amount, unit, location, image } = this.state;

      axios.defaults.withCredentials = true;
      axios.get(UrlService.getCookie())
      .then(response => {
        axios.put(UrlService.PostMaterial(), { id, name, description, amount, unit, location, image })
          .then((response) => {
            console.log(response);
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
      alert("Whoops! Je bent een veld vergeten in te vullen, of je hebt een komma gebruikt. \nVul a.u.b. voor verzenden alle velden in.");
    }

  }

  parseAttributesIntoState = () => {
    this.setState({
      id: this.props.materialAttributes.id,
      name: this.props.materialAttributes.name,
      description: this.props.materialAttributes.description,
      amount: this.props.materialAttributes.amount,
      unit: this.props.materialAttributes.unit,
      location: this.props.materialAttributes.location,
    })
  }

  checkUserRights = (user) => {
    // console.log(user.is_admin);
    // console.log(user.is_admin!==undefined && user.is_admin!=="0");
    return user.is_admin!==undefined && user.is_admin!=="0";
  }

  componentDidMount = () => {
    this.parseAttributesIntoState()
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <>
      <h2 className="addmaterial__title"> MATERIAAL AANPASSEN...</h2>
      <div className="addmaterial__titlebar"></div>
      <form className="addmaterial__form" method="POST">

        {this.checkUserRights(this.props.user)===false ?
          <>
            <h3 className="addmaterial__form__title"> {this.state.name}</h3>
            <p className="addmaterial__form__text"> {this.state.description}</p>
          </>
        :
          <>
            <label className="addmaterial__form__label" htmlFor="name">
              <input className="addmaterial__form__input" placeholder="Naam" type="text" name="name"   onChange={this.onChange} defaultValue={this.props.materialAttributes.name} required autoComplete='false'/>
            </label>
            <label className="addmaterial__form__label" htmlFor="description">
              <input className="addmaterial__form__input" placeholder="Omschrijving" type="text" name="description"   onChange={this.onChange} defaultValue={this.props.materialAttributes.description} required autoComplete='false'/>
            </label>
          </>
         }

        <label className="addmaterial__form__label" htmlFor="amount">
          <input className="addmaterial__form__input" placeholder="Hoeveelheid" type="number" name="amount"  onChange={this.onChange} defaultValue={this.props.materialAttributes.amount} required autoComplete='false'/>
        </label>
        <label className="addmaterial__form__label" htmlFor="unit">
          <input className="addmaterial__form__input" placeholder="Eenheid" type="text" name="unit"   onChange={this.onChange} defaultValue={this.props.materialAttributes.unit} required autoComplete='false'/>
        </label>

        {this.checkUserRights(this.props.user)===false ?
          <>
            <p className="addmaterial__form__text"> {this.state.location}</p>
          </>
        :
          <>
            <label className="addmaterial__form__label" htmlFor="location">
              <input className="addmaterial__form__input" placeholder="Waar ligt het?" type="text" name="location"   onChange={this.onChange} defaultValue={this.props.materialAttributes.location} required autoComplete='false'/>
            </label>
            <label className="addmaterial__form__label" htmlFor="image">
            <input className="addmaterial__form__input" placeholder="Hoe ziet het eruit?" type="file" name="image"   onChange={this.onChange} autoComplete='false'/>
            </label>
          </>
         }

        <section className="addmaterial__form__buttons">
          <div className="addmaterial__form__buttons__close" onClick={this.props.closeModal}></div>
          <button className="addmaterial__form__buttons__submit" type="submit" value="submit" onClick={this.submitForm}></button>
        </section>
      </form>
      </>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(EditMaterialForm);
