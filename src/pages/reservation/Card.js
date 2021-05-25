import React from "react";

class Card extends React.Component {

  render() {
    return (
      <article className="reservation__card__container">
        <article className="reservation__optie">
          <section className="reservation__optie__knop">
            <img className="reservation__optie__knop__image" src={this.props.img} alt={this.props.title} />
            <p>{this.props.title || "Apparaat"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Card;
