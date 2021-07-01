import React from "react";
// import UrlService from "../../services/UrlService";

class EditMaterialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  submitForm = (e) => {
    e.preventDefault();
    // if (this.checkIfFormFilled() && !this.state.isLoading) {
    //   const { name, description, amount, unit, location, image } = this.state;
    //   this.setState({ isLoading: true });
    //   console.log(this.state);
    //
    //   axios.defaults.withCredentials = true;
    //   axios.get(UrlService.getCookie())
    //   .then(response => {
    //     axios.post(UrlService.PostMaterial(), { name, description, amount, unit, location, image })
    //       .then((response) => {
    //         // TODO: ADD LOADING COMPONENT TO PREVENT USER FROM TAPPING SEND MORE THAN ONCE
    //         if (response.status === 200) {
    //           this.setState({ isLoading: false }); // quick fix for above TODO
    //           this.props.showSuccessComponent(true);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         this.setState({ isLoading: false });
    //       })
    //   })
    // } else {
    //   alert("Whoops! Je bent een veld vergeten in te vullen. \nVul a.u.b. voor verzenden alle velden in.");
    // }

    console.log("edit material form submitted");
    this.props.showSuccessComponent(true);

  }

  render() {
    return(
      <>
      <h2 className="addmaterial__title"> MATERIAAL AANPASSEN...</h2>
      <div className="addmaterial__titlebar"></div>
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
      </>
    )
  }

}

export default EditMaterialForm;
