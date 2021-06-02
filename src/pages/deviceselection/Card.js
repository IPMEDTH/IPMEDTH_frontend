import React from "react";

class Card extends React.Component {

  onCardClicked = () => {
    this.props.cardClicked(this.props.id);
  }

  render() {
    return (
      <article className="deviceselection__card__container">
        <article className="deviceselection__optie">
          <section className="deviceselection__optie__knop" onClick={this.onCardClicked}>
            <img className="deviceselection__optie__knop__image" src={this.props.img} alt={this.props.title} />
            <p>{this.props.title || "Apparaat"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Card;
