import React from "react";
import Card from "./Card";

import axios from "axios";
import UrlService from "../../services/UrlService";

var deviceid = window.localStorage.getItem('device');

class CardList extends React.Component {

  cardClicked = (id) => {
    this.props.cardClicked(id);
  }

  constructor(props) {
    super(props);
    this.state = {
        Elements: []
    };
  }

  getDeviceData() {
    axios.get(UrlService.DeviceMenu(deviceid), {}).then(res => {
      const data = res.data
      console.log(data)
      const device = data.map(u =>
        <Card title={u.naam}
          id={u.id}
          img={u.image_link}
          cardClicked={this.cardClicked}
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
      <section className="cards">
        {this.state.device}
      </section>
    );
  }
}

export default CardList;
