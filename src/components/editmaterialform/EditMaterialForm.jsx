import React from "react";
import UrlService from "../../services/UrlService";
import axios from 'axios';

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
    console.log(this.props.materialAttributes.id);
    console.log(this.state.id);
    if (this.checkIfFormFilled() && !this.state.isLoading) {
      const { id, name, description, amount, unit, location, image } = this.state;
      const testIdVar = this.state.id;
      console.log(testIdVar);
      this.setState({ isLoading: true });
      console.log(this.state);

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
      alert("Whoops! Je bent een veld vergeten in te vullen. \nVul a.u.b. voor verzenden alle velden in.");
    }

    // console.log("edit material form submitted");
    // this.props.showSuccessComponent(true);

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

  componentDidMount = () => {
    this.parseAttributesIntoState()
  }

  render() {
    return(
      <>
      <h2 className="addmaterial__title"> MATERIAAL AANPASSEN...</h2>
      <div className="addmaterial__titlebar"></div>
      <form className="addmaterial__form" method="POST">
        <label className="addmaterial__form__label" htmlFor="name">
          <input className="addmaterial__form__input" placeholder="Naam" type="text" name="name"   onChange={this.onChange} defaultValue={this.props.materialAttributes.name} required autoComplete='false'/>
        </label>
        <label className="addmaterial__form__label" htmlFor="description">
          <input className="addmaterial__form__input" placeholder="Omschrijving" type="text" name="description"   onChange={this.onChange} defaultValue={this.props.materialAttributes.description} required autoComplete='false'/>
        </label>
        <label className="addmaterial__form__label" htmlFor="amount">
          <input className="addmaterial__form__input" placeholder="Hoeveelheid" type="number" name="amount"  onChange={this.onChange} defaultValue={this.props.materialAttributes.amount} required autoComplete='false'/>
        </label>
        <label className="addmaterial__form__label" htmlFor="unit">
          <input className="addmaterial__form__input" placeholder="Eenheid" type="text" name="unit"   onChange={this.onChange} defaultValue={this.props.materialAttributes.unit} required autoComplete='false'/>
        </label>
        <label className="addmaterial__form__label" htmlFor="location">
          <input className="addmaterial__form__input" placeholder="Waar ligt het?" type="text" name="location"   onChange={this.onChange} defaultValue={this.props.materialAttributes.location} required autoComplete='false'/>
        </label>
        <label className="addmaterial__form__label" htmlFor="image">
        <input className="addmaterial__form__input" placeholder="Hoe ziet het eruit?" type="file" name="image"   onChange={this.onChange} autoComplete='false'/>
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

export default EditMaterialForm;
