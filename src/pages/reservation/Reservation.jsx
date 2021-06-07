import React from "react";
import './reservation.scss';
import triangle from '../../images/triangle_arrow.png';

import Header from "../../components/header/Header";
import CardList from "./CardList";
import PersonList from "./PersonList";
import Footer from "../../components/footer/Footer";

import DatePicker from "./DatePicker";

var state = "closed";

class ReservationPage extends React.Component {

  onHelpClicked = () => {
    var element = document.getElementById("js--reservation__hulp");
    var checkbox = document.getElementById("js--checkbox");
    element.classList.toggle('active');

    if (state === "closed") {
      state = "open";
      checkbox.checked = true;
      document.getElementById("js--reservation__triangle").animate([{transform: 'rotate(0deg)'}], {duration: 300});
      document.getElementById("js--help").style.marginBottom = "23vh";

      var delayInMilliseconds = 275; //1 second
      setTimeout(function() {
        document.getElementById("js--reservation__triangle").style.transform = "rotate(0deg)";
      }, delayInMilliseconds);
    }
    else if (state === "open") {
      state = "closed";
      checkbox.checked = false;
      document.getElementById("js--reservation__triangle").animate([{transform: 'rotate(90deg)'}], {duration: 300});
      document.getElementById("js--help").style.marginBottom = "0";

      var delayInMilliseconds2 = 275; //1 second
      setTimeout(function() {
        document.getElementById("js--reservation__triangle").style.transform = "rotate(90deg)";
      }, delayInMilliseconds2);
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

            <DatePicker />
          </section>
          <section id="js--help" className="reservation__hulp">
            <section className="reservation__hulp__container" onClick={this.onHelpClicked}>
              <label className="reservation__hulp__container__checkbox">
                <input id="js--checkbox" type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <p>Verwacht je hulp nodig te hebben?</p>
              <img id="js--reservation__triangle" className="reservation__hulp__image__two" src={triangle} alt="checkbox" />
              <section id="js--reservation__hulp" className="reservation__dropdown reservation__dropdown--animated">
                <PersonList />
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
