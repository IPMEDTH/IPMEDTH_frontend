import React from "react";
import './addmaterialform.css';

class AddMaterialForm extends React.Component {
  render() {
    return(
      <>
        <form className="addmaterial__form">
          <label className="addmaterial__form__label" htmlFor="">This is a label
            <input className="addmaterial__form__input" placeholder="placeholder" type="text" name="name"  defaultValue="default value" />
          </label>
          <button className="addmaterial__form__submit" type="submit" value="submit" onClick={this.props.submitForm}> Voeg Materiaal Toe &#10151;</button>
          <button className="addmaterial__form__close">Close</button>
          </form>
        </>
    )
  }

}

export default AddMaterialForm;
