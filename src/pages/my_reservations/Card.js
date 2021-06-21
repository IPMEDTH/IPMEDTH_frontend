import React from "react";
import axios from "axios";

import UrlService from "../../services/UrlService";

var data;

class Card extends React.Component {

  getTitleData() {
    var deviceid = this.props.id;
    axios.get(UrlService.DeviceMenu(deviceid), {}).then(res => {
      data = res.data.name;
      document.getElementById("js--reservation__title").innerHTML = data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getTitleData();
  }

  render() {
    return (
      <article className="reservation__card__container">
        <article className="reservation__optie">
          <section className="reservation__optie__knop">
            <img className="reservation__optie__knop__image" src={this.props.img} alt={this.props.title} />
            <p id="js--reservation__title" className="reservation__optie__knop__title">{data || "Apparaat"}</p>
            <p className="reservation__optie__knop__description">Datum: {this.props.date || "Datum"}</p>
            <p className="reservation__optie__knop__starttime">Tijd: {this.props.starttime || "Tijd"} tot {this.props.endtime || "Tijd"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Card;
