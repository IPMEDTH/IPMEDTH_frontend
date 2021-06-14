import React from "react";
import Card from "./Card";

import axios from "axios";
import UrlService from "../../services/UrlService";

var deviceid = window.localStorage.getItem('device');

class CardList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        Elements: []
    };
  }

  getDeviceData() {
    deviceid = window.localStorage.getItem('device');
    axios.get(UrlService.DeviceMenu(deviceid), {}).then(res => {
      const data = res.data
      var list = [];
      list.push(data);
      console.log(list);
      const device = list.map(u =>
        <Card title={u.name}
          description={u.description}
          amount={u.amount}
          id={u.id}
          img={u.image_url}
          key={u.id}
        />
      )

      this.setState({
        device
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getDeviceData();
  }

  render() {
    return (
      <section className="reservation__cards">
        {this.state.device}
      </section>
    );
  }
}

export default CardList;
