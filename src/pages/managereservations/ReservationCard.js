import React from "react";
import axios from "axios";

import UrlService from "../../services/UrlService";

class ReservationCard extends React.Component {

  onCancelClicked = () => {
    axios.delete(UrlService.DeleteReservations(this.props.id), {}).then(res => {
      window.location.reload(false);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <article className="reservationcard">
        <div className="row">
          <div className="image_container">
            <figure>
              <img src={this.props.img} alt={this.props.title} />
            </figure>
          </div>
          <section>
            <h3>{this.props.title || "Apparaat"}</h3>
            <p>Datum: {this.props.date || "Datum"}</p>
            <p>Tijd: {
              this.props.starttime.split(":")[0] + ":" + this.props.starttime.split(":")[1] || "Tijd"
            } tot {
              this.props.endtime.split(":")[0] + ":" + this.props.endtime.split(":")[1] || "Tijd"
            }</p>
            <p>Door: {this.props.name}</p>
          </section>
        </div>
        <button type="button" onClick={this.onCancelClicked}>Annuleer</button>
      </article>
    );
  }
}

export default ReservationCard;
