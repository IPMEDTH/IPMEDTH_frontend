import React from "react";

class Card extends React.Component {

  onCardClicked = () => {
    this.props.cardClicked(this.props.id, this.props.title, this.props.amount);
  }

  render() {
    return (
      <article className="deviceselection__card__container">
        <article className="deviceselection__optie">
          <section className="deviceselection__optie__knop" onClick={this.onCardClicked}>
            <img className="deviceselection__optie__knop__image" src={this.props.img} alt={this.props.title} />
            <p className="deviceselection__optie__knop__title">{this.props.title || "Apparaat"}</p>
            <p className="deviceselection__optie__knop__description">{this.props.description || "Beschrijving..."}</p>
            <p className="deviceselection__optie__knop__places">Aantal plekken: {this.props.amount || "Nummer"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Card;
