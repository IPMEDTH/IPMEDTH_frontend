import React from "react";
import Card from "./Card";

import axios from "axios";
import { connect } from "react-redux";
import UrlService from "../../services/UrlService";

var deviceid = window.localStorage.getItem('device');

class CardList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        Elements: []
    };
  }

  getReservationData() {
    if (this.props.user !== '') {
      var userid = this.props.user.id; //Need to add real user id


      axios.get(UrlService.ReservationMenu(userid), {}).then(res => {
        const data = res.data
        var list = [];
        list.push(data);
        console.log(list);
        const reservation = data.map(u =>
          <Card title={u.name}
            date={u.date}
            starttime={u.start_time}
            endtime={u.end_time}
            id={u.id}
            img={u.image_url}
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
    } else {
      console.log("niet ingelogd!");
    }
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CardList);
