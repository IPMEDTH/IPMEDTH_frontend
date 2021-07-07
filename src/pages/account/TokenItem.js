import React from "react";
import axios from "axios";

import './tokenitem.scss';

import UrlService from "../../services/UrlService";

class TokenItem extends React.Component {

  onClickDelete = () => {
    axios.delete(UrlService.delToken(this.props.id)).then(res => {
      window.location.reload(false);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <article className="tokenitem">
        <div className="column">
          <h5>{this.props.name}</h5>
          <p>Laatst gebruikt: {this.props.last_used_at || "nooit"}</p>
        </div>
        <button type="button" onClick={this.onClickDelete}>Verwijder Token</button>
      </article>
    );
  }
}

export default TokenItem;
