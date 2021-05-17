import React from "react";
import Card from "./Card";

import axios from "axios";
import UrlService from "../../services/UrlService";

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

  getDevicesData() {
    axios.get(UrlService.Devices("devices"), {}).then(res => {
      const data = res.data
      console.log(data)
      const devices = data.map(u =>
        <Card title={u.naam}
              desc={u.beschrijving}
              id={u.id}
              img={UrlService.DeviceImages(u.img)}
              cardClicked={this.cardClicked}
              key={u.id}
        />
      )

      this.setState({
        devices
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getDevicesData();
  }

  render() {
    return (
      <section className="cards">
        {this.state.devices}
      </section>
    );
  }
}

export default CardList;
