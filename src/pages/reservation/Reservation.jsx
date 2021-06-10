import React from "react";
import './reservation.scss';
import triangle from '../../images/triangle_arrow.png';
import UrlService from "../../services/UrlService";
import axios from 'axios';
import { Redirect } from "react-router-dom";

import Header from "../../components/header/Header";
import CardList from "./CardList";
import PersonList from "./PersonList";
import Footer from "../../components/footer/Footer";

import DatePicker from "./DatePicker";

var state = "closed";

class ReservationPage extends React.Component {

  constructor() {
    super();
    this.state = {
      location: '',
      date: '',
      start: '',
      end: '',
      help: false,
      isLoading: false,
      redirect: null
    };
    this.fillReservation = this.fillReservation.bind(this);
    this.submitReservation = this.submitReservation.bind(this);
  }

  onHelpClicked = () => {
    var element = document.getElementById("js--reservation__hulp");
    var checkbox = document.getElementById("js--checkbox");
    element.classList.toggle('active');

    if (state === "closed") {
      state = "open";
      this.setState({ help: true });
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
      this.setState({ help: false });
      checkbox.checked = false;
      document.getElementById("js--reservation__triangle").animate([{transform: 'rotate(90deg)'}], {duration: 300});
      document.getElementById("js--help").style.marginBottom = "0";

      var delayInMilliseconds2 = 275; //1 second
      setTimeout(function() {
        document.getElementById("js--reservation__triangle").style.transform = "rotate(90deg)";
      }, delayInMilliseconds2);
    }

  }

  checkIfFormFilled = () => {
    return (
      this.state.location !== ''  &&
      this.state.date !== ''  &&
      this.state.start !== ''  &&
      this.state.end !== ''  &&
      this.state.help !== ''
    )
  }

  fillReservation = (e) => {
    console.log("Stuur naar database: ");
    var location = window.localStorage.getItem('device');
    console.log("location: " + this.state.location);
    this.setState({ location: `${location}` });


    var timedate = window.localStorage.getItem('timedate');
    this.setState({ date: `${timedate}` });
    console.log("date: " + this.state.date);

    var timestart = window.localStorage.getItem('timestart');
    this.setState({ start: `${timestart}` });
    console.log("start: " + this.state.start);

    var timeend = window.localStorage.getItem('timeend');
    this.setState({ end: `${timeend}` });
    console.log("end: " + this.state.end);

    console.log("help: " + this.state.help);

    this.submitReservation(e);

  }

  submitReservation = (e) => {
    console.log("location check: " + this.state.location);
    e.preventDefault();
    console.log(this.checkIfFormFilled());
    if (this.checkIfFormFilled() && !this.state.isLoading) {
      const { location, date, start, end, help } = this.state;
      this.setState({ isLoading: true });

      axios.defaults.withCredentials = true;
      axios.get(UrlService.getCookie())
      .then(response => {
        axios.post(UrlService.PostReservation(), { location, date, start, end, help })
          .then((response) => {
            // TODO: ADD LOADING COMPONENT TO PREVENT USER FROM TAPPING SEND MORE THAN ONCE
            if (response.status === 200) {
              this.setState({ isLoading: false }); // quick fix for above TODO
              this.setState({ redirect: "/" });
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      alert("Whoops! Je bent een veld vergeten in te vullen. \nVul a.u.b. voor verzenden alle velden in.");
    }

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
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
          <section className="reservation__confirm">
            <button className="reservation__confirm__button__submit" type="submit" value="submit" onClick={this.fillReservation}>Bevestig</button>
          </section>
        </article>

        <Footer />
      </section>
    );
  }
}

export default ReservationPage;
