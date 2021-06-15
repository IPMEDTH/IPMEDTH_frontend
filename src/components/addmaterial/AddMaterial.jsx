import React from "react";
import './addmaterial.scss';
import icon from '../../images/add_black_24dp.svg';

class AddMaterial extends React.Component {
  render() {
    return(
      <section className="addmaterial" onClick={this.props.onClick}>
        <article className="addmaterial__info">
          <h3 className="addmaterial__info__title"> Materiaal Toevoegen... </h3>
        </article>
        <img className="addmaterial__info__image" src={icon} alt="Add Material icon"></img>
      </section>
    )
  }

}

export default AddMaterial;
