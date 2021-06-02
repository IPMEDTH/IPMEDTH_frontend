import React from "react";

class Person extends React.Component {

  render() {
    return (
      <article className="reservation__card__container">
        <article className="reservation__optie">
          <section className="reservation__optie__knop">
            <img className="reservation__optie__knop__image" src={this.props.img} alt={this.props.title} />
            <p>{this.props.title || "Naam Persoon"}</p>
            <p>{this.props.knowledge || "Ik heb kennis van..."}</p>
            <p>{this.props.available || "Ik ben dan en dan aanwezig"}</p>
          </section>
        </article>
      </article>
    );
  }
}

export default Person;
