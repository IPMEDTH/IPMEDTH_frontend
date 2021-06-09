import React from "react";

class Person extends React.Component {

  render() {
    return (
      <article className="reservation__card__container">
        <article className="reservation__optie">
          <section className="reservation__optie__knop">
            <img className="reservation__optie__knop__image--person" src={this.props.img || "https://api.ipmedth.meulen.dev/persoon.png"} alt={this.props.title} />
            <p className="reservation__optie__knop__name">{this.props.title || "Naam Persoon"}</p>
            <p className="reservation__optie__knop__knowledge">{this.props.knowledge || "Ik heb kennis van..."}</p>
            <p className="reservation__optie__knop__available">{this.props.available || "Ik ben dan en dan aanwezig"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Person;
