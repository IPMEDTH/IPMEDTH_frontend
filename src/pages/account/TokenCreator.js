import React from "react";
import axios from "axios";

import './tokencreator.scss';

import UrlService from "../../services/UrlService";
import Input from "../../components/input_field/Input"

class TokenCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({	[event.target.name]: event.target.value });
	};

  handleSubmit(event) {
    event.preventDefault();

    axios.defaults.withCredentials = true;

    axios.post(UrlService.createToken(), { token_name: this.state.name})
    .then(response => {
      alert("Token: " + response.data.token);
      window.location.reload(false);
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <article className="tokencreator">
        <form onSubmit={this.handleSubmit}>
          <Input
            type='text'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            label="Naam"
            placeholder="Test token"
          />
          <input type="submit" value="Genereer token" />
        </form>

      </article>
    );
  }
}

export default TokenCreator;

