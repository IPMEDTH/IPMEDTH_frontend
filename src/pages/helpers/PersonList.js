import React from "react";
import Person from "./Person";

import axios from "axios";
import UrlService from "../../services/UrlService";

class PersonList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        Elements: []
    };
  }

  getHelperData() {
    axios.get(UrlService.HelperMenu(), {}).then(res => {
      const data = res.data
      console.log(data);
      window.localStorage.setItem('helpers_amount', data.length);
      const helper = data.map(u =>
        <Person title={u.name}
          knowledge={u.knowledge}
          available={u.available}
          id={u.id}
          img={u.image_url}
          key={u.id}
        />
      )

      this.setState({
        helper
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getHelperData();
  }

  render() {
    return (
      <section className="helpers__cards">
        {this.state.helper}
      </section>
    );
  }
}

export default PersonList;
