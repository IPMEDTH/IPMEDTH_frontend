import React from "react";
import axios from "axios";

import UrlService from "../../services/UrlService";
import ReservationCard from "./ReservationCard";

class ReservationCardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        Elements: []
    };
  }

  getReservationData() {
    axios.get(UrlService.Reservations()).then(res => {
      const reservation = res.data.map(u =>
        <ReservationCard title={u.location.name}
          date={u.date}
          starttime={u.start_time}
          endtime={u.end_time}
          id={u.id}
          img={u.location.image_url}
          name={u.user.name}
          key={u.id}
        />
      )

      this.setState({
        reservation
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getReservationData();
  }

  render() {
    return (
      <section className="reservation__cards">
        {this.state.reservation}
      </section>
    );
  }
}

export default ReservationCardList;
