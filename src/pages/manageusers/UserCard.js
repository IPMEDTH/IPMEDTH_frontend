import React from "react";
import axios from "axios";

import UrlService from "../../services/UrlService";

class UserCard extends React.Component {

  toggleAdmin = () => {
    console.log('clicked')
    axios.put(UrlService.setUserAdmin(this.props.id), {isadmin: this.props.isadmin === "1" || this.props.isadmin === 1 ? 0 : 1})
    .then(response => {
      window.location.reload(false);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <article className="usercard">
        <div className="image_container">
          <figure>
            <img src={this.props.image_url} alt={this.props.name} />
          </figure>
        </div>
        <section>
          <h3>{this.props.name}</h3>
          <p>{this.props.email} {this.props.email_verified_at ? "✓" : "✗"}</p>
          <p>Kennis: {this.props.knowledge}</p>
          <p>Aanwezigheid: {this.props.available}</p>
          <button type="button" onClick={this.toggleAdmin}>
            {
              this.props.isadmin === "1" || this.props.isadmin === 1 ? "Beheersrol intrekken" : "Beheersrol toekennen"
            }
          </button>
        </section>
      </article>
    );
  }
}

export default UserCard;
