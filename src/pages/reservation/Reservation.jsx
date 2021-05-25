import React from "react";
import './reservation.scss';
import unchecked from '../../images/checkbox_unchecked.png';
import checked from '../../images/checkbox_checked.png';
import triangle from '../../images/triangle_arrow.png';

import Header from "../../components/header/Header"
import CardList from "../../pages/reservation/CardList";
import Footer from "../../components/footer/Footer"

var state = "closed";

class ReservationPage extends React.Component {

  onHelpClicked = () => {
    var element = document.getElementById("js--reservation__hulp");
    element.classList.toggle('active');

    if (state == "closed") {
      state = "open";
      document.getElementById("js--reservation__triangle").animate([{transform: 'rotate(0deg)'}], {duration: 500});

      var delayInMilliseconds = 490; //1 second
      setTimeout(function() {
        document.getElementById("js--reservation__triangle").style.transform = "rotate(0deg)";
      }, delayInMilliseconds);
    }
    else if (state == "open") {
      state = "closed";
      document.getElementById("js--reservation__triangle").animate([{transform: 'rotate(90deg)'}], {duration: 500});

      var delayInMilliseconds = 490; //1 second
      setTimeout(function() {
        document.getElementById("js--reservation__triangle").style.transform = "rotate(90deg)";
      }, delayInMilliseconds);
    }

  }

  render() {
    return(
      <section className="reservation">
        <Header />

        <article className="reservation__choice__content">
          <section>
            <h1 className="reservation__choice__subtitle">Wanneer wil je aan de slag?</h1>
          </section>
          <section className="reservation__container">
            <CardList />

            <h2>Datum/tijd selectie</h2>
          </section>
          <section className="reservation__hulp">
            <section className="reservation__hulp__container" onClick={this.onHelpClicked}>
              <img id="js--reservation__checkbox" className="reservation__hulp__image__one" src={unchecked} alt="checkbox" />
              <p>Verwacht je hulp nodig te hebben?</p>
              <img id="js--reservation__triangle" className="reservation__hulp__image__two" src={triangle} alt="checkbox" />
              <section id="js--reservation__hulp" className="reservation__dropdown reservation__dropdown--animated">
                Test
              </section>
            </section>
          </section>
        </article>

        <Footer />
      </section>
    );
  }
}

export default ReservationPage;
