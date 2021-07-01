import React from "react";

class Person extends React.Component {

  render() {
    return (
      <article className="helpers__card__container">
        <article className="helpers__optie">
          <section className="helpers__optie__knop">
            <img className="helpers__optie__knop__image--person" src={this.props.img || "https://api.ipmedth.meulen.dev/persoon.png"} alt={this.props.title} />
            <p className="helpers__optie__knop__name"><b>{this.props.title || "Naam Persoon"}</b></p>
            <p className="helpers__optie__knop__knowledge"><b>Heeft kennis van:</b><br/>  {this.props.knowledge || "Onbekend"}</p>
            <p className="helpers__optie__knop__available"><b>Aanwezigheid:</b><br/> {this.props.available || "Onbekend"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Person;
