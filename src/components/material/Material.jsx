import React from "react";

class Material extends React.Component {
  render() {
    return(
      <section className="inventory__content-item">
        <article className="inventory__content-item__info">
          <h3 className="inventory__content-item__info__title"> {this.props.name}</h3>
          <p className="inventory__content-item__info__amount"> {this.props.amount} {this.props.unit}</p>
          <p className="inventory__content-item__info__description"> {this.props.description}</p>
        </article>
        <img className="inventory__content-item__info__image" src={this.props.img_url} alt="THIS IS A MATERIAL AAAAAA"></img>
      </section>
    )
  }

}

export default Material;
