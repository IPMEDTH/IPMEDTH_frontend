import React from "react";
import './reservation.scss';
import triangle from '../../images/triangle_arrow.png';
import UrlService from "../../services/UrlService";
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import CardList from "./CardList";
import PersonList from "./PersonList";
import Footer from "../../components/footer/Footer";

import DatePicker from "./DatePicker";

var state = "closed";
var valueHelpers = "Wij zijn er om je te helpen!";
var countReservations = 0;

function getWindowDimensions() {
  const { innerWidth: width} = window;
  return {
    width
  };
}


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
    //console.log(element.classList.value);
    //console.log(state);
    if (element.classList.value.includes("active") && state === "open") {
      state = "closed";
    }

    if (state === "closed") {
      state = "open";
      this.setState({ help: true });
      checkbox.checked = true;
      document.getElementById("js--reservation__triangle").animate([{transform: 'rotate(0deg)'}], {duration: 300});
      var helpers_amount = window.localStorage.getItem('helpers_amount');
      const { width } = getWindowDimensions();
      console.log(width);
      if (width < 1600 && width > 1400) {
        var marginBot = helpers_amount * 40;
      } else {
        marginBot = helpers_amount * 32.5;
      }
      marginBot = marginBot + "vh";
      if (helpers_amount === "0") {
        valueHelpers = "Helaas zal er op dit moment niemand zijn om te helpen.";
        marginBot = "12vh";
      } else {
        valueHelpers = "Wij zijn er om je te helpen!";
      }
      //console.log(marginBot);
      document.getElementById("js--help").style.marginBottom = marginBot;

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
    if (this.props.user !== '') {
      var user_id = this.props.user.id;
      console.log("USER ID: " + user_id);
      var location = window.localStorage.getItem('device');
      console.log("Location: " + location);
      var timedate = window.localStorage.getItem('timedate');
      console.log("Date: " + timedate);
      var timestart = window.localStorage.getItem('timestart');
      console.log("Start: " + timestart);
      var timeend = window.localStorage.getItem('timeend');
      console.log("End: " + timeend);
      this.setState({ user_id: `${user_id}`,location: `${location}`, date: `${timedate}`, start: `${timestart}`, end: `${timeend}` }, () => {this.submitReservation(e)});
    } else {
      console.log("Niet ingelogd!");
      alert("Om te reserveren moet je inloggen!");
      this.setState({ redirect: "/login" });
    }
  }

  submitReservation = (e) => {
    e.preventDefault();
    console.log(this.checkIfFormFilled());
    if (this.checkIfFormFilled() && !this.state.isLoading) {
      const { user_id, location, date, start, end, help } = this.state;

      console.log("HIER HIER HIER");

      axios.get(UrlService.GetReservationMenu(location, date), {}).then(res => {
        const data = res.data;
        console.log(data.length);
        if (data.length !== 0) {
          console.log(data);
          data.forEach((item, i) => {
            var reserved_start = item.start_time;
            var reserved_end = item.end_time;
            var calculated_reserved_start = parseInt(reserved_start.substring(0,2)) * 60 + parseInt(reserved_start.substring(3,5));
            var calculated_reserved_end = parseInt(reserved_end.substring(0,2)) * 60 + parseInt(reserved_end.substring(3,5));
            console.log("daadwerkelijke starttijd: " + reserved_start);
            console.log("berekende waarde start: " + calculated_reserved_start);
            console.log("berekende waarde eind: " + calculated_reserved_end);
            var calculated_selected_start_time = parseInt(start.substring(0,2)) * 60 + parseInt(start.substring(3,5));
            var calculated_selected_end_time = parseInt(end.substring(0,2)) * 60 + parseInt(end.substring(3,5));
            if ((calculated_selected_start_time <= calculated_reserved_start && calculated_selected_end_time > calculated_reserved_start) || (calculated_selected_start_time > calculated_reserved_start && calculated_selected_end_time < calculated_reserved_end) || (calculated_selected_start_time < calculated_reserved_end && calculated_selected_end_time > calculated_reserved_start)) {
              console.log("Reservering in dit tijdslot, +1.");
              countReservations += 1;
            }
          });
          console.log("aantal reserveringen binnen tijdslot: " + countReservations);
        } else {
          console.log("Nog geen reserveringen binnen tijdslot.");
        }
        var places_available = window.localStorage.getItem('places');
        if (countReservations < places_available) {
          this.setState({ isLoading: true });

          axios.defaults.withCredentials = true;
          axios.get(UrlService.getCookie())
          .then(response => {
            axios.post(UrlService.Reservations(), { user_id, location, date, start, end, help })
              .then((response) => {
                // TODO: ADD LOADING COMPONENT TO PREVENT USER FROM TAPPING SEND MORE THAN ONCE
                if (response.status === 200) {
                  this.setState({ isLoading: false, location: '', date: '', start: '', end: '' });
                  window.localStorage.setItem('device', '');
                  window.localStorage.setItem('timedate', '');
                  window.localStorage.setItem('timestart', '');
                  window.localStorage.setItem('timeend', '');
                  countReservations = 0;
                  //this.setState({ isLoading: false }); // quick fix for above TODO
                  this.setState({ redirect: "/" });
                }
              })
              .catch((error) => {
                console.log(error);
              })
          })
        } else {
          countReservations = 0;
          alert("Whoops! Er zijn al te veel reserveringen binnen het gekozen tijdslot, verander de tijden en probeer opnieuw!");
        }
      });
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
        <Link className="header__return" to="/deviceselection">
          <p className="header__back">&larr; Ga terug naar vorige pagina</p>
        </Link>

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
                <h1>{valueHelpers}</h1>
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ReservationPage);
