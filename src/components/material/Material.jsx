import React from "react";
import UrlService from "../../services/UrlService";

class Material extends React.Component {
  render() {
    return(
      <section className="inventory__content-item">
        <article className="inventory__content-item__info">
          <h3 className="inventory__content-item__info__title"> {this.props.name}</h3>
          <p className="inventory__content-item__info__amount"> {this.props.amount} {this.props.unit}</p>
          <p className="inventory__content-item__info__description"> {this.props.description}</p>
        </article>
        <figure className="inventory__content-item__info__figure">
          <img className="inventory__content-item__info__figure__image" src={UrlService.MaterialImage(this.props.img_url)} alt={"Foto van " + this.props.name}></img>
        </figure>
      </section>
    )
  }

}

export default Material;
