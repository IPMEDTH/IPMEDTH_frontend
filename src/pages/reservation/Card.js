import React from "react";

class Card extends React.Component {

  onCardClicked = () => {
    this.props.cardClicked(this.props.id);
  }

  render() {
    return (
      <article className="card__container">
        <article className="card" onClick={this.onCardClicked}>
          <figure className="card__figure">
            <img className="card__figure__img" src={this.props.img} alt={this.props.title} />
          </figure>
          <header className="card__header">
            <h2> {this.props.title || "Gerecht met ingredienten xxxx"} </h2>
          </header>
        </article>
      </article>
    );
  }
}

export default Card;
