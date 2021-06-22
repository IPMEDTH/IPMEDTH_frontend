import React from "react";

import axios from "axios";
import UrlService from "../../services/UrlService";

class Card extends React.Component {

  onCancelClicked = () => {
    console.log("del id: " + this.props.id);
    axios.delete(UrlService.DeleteReservations(this.props.id), {}).then(res => {
      window.location.reload(false);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <article className="reservation__card__container">
        <article className="reservation__optie">
          <section className="reservation__optie__knop">
            <img className="reservation__optie__knop__image" src={this.props.img} alt={this.props.title} />
            <p id="js--reservation__title" className="reservation__optie__knop__title">{this.props.title || "Apparaat"}</p>
            <p className="reservation__optie__knop__description">Datum: {this.props.date || "Datum"}</p>
            <p className="reservation__optie__knop__starttime">Tijd: {this.props.starttime || "Tijd"} tot {this.props.endtime || "Tijd"}</p>
            <button className="reservation__optie__knop__button" type="button" onClick={this.onCancelClicked}>Annuleer</button>
          </section>
        </article>
      </article>
    );
  }
}

export default Card;
