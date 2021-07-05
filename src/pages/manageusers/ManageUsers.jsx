import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";
import './manageusers.scss';

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios.get(UrlService.getCookie())
    .then(() => {
      axios.get(UrlService.getUsers())
  		.then(response => {
        this.setState({users: response.data});
        console.log(response)
  		})
  		.catch((error) => {
        // this.setState({ loading: false });
        if (error.response) {
          console.log(error.response)
        }
  		});
    });
  }

  render() {
    return (
      <section className='manageusers'>
        <Header />
        <main className="manageusers__content">
          <h2 className="manageusers__content__title">GEBRUIKERS</h2>
          { this.state.users.map((item, i) => <pre key={i}>{ JSON.stringify(item, null, 4)}</pre>)}
          { console.log(this.state.users)}
        </main>
        <Footer />
      </section>
    )
  }
}

export default ManageUsers;
