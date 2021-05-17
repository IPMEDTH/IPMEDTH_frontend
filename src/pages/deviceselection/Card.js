import React from "react";

class Card extends React.Component {

  onCardClicked = () => {
    this.props.cardClicked(this.props.id);
  }

  render() {
    return (
      <article className="card__container">
        <article className="optie">
          <section className="optie__knop">
            <p>{this.props.title || "Apparaat"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Card;
