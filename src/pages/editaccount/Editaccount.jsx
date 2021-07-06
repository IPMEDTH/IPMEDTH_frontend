import React from "react";
import axios from 'axios';
import UrlService from "../../services/UrlService";

import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { connect } from "react-redux";

import Input from "../../components/input_field/Input"
import './editaccount.scss';
import { Icon } from "@material-ui/core";

class Editaccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      knowledge: this.props.user.knowledge,
      available: this.props.user.available,
      image_url: this.props.user.image_url,
    }
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "image_url") {
      console.log(event.target.files);
      let files = event.target.files || event.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
    } else {
      this.setState({	[event.target.name]: event.target.value });
    }
	};

  createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        image_url: e.target.result
      })
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    const { name, email, knowledge, available, image_url } = this.state;

    console.log(this.state);

    axios.get(UrlService.getCookie())
    .then(() => {
      axios.put(UrlService.getUser(), { name, email, knowledge, available, image_url })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log('Success');
            this.props.history.push('/account');
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
  };



  render() {
    return (
      <section className='editaccount'>
        <Header />
        <main className="editaccount__content">
          <h2 className="editaccount__content__title">BEWERKEN</h2>
          <form className="editaccount__content__form" onSubmit={this.handleSubmit}>
            <div className="editaccount__content__form__imgdiv">
              <label className="editaccount__content__form__imglabel" htmlFor="image_url">
                <img className="editaccount__content__form__img" src={this.state.image_url ? this.state.image_url : 'https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg'} alt="Profielfoto" />
                <Icon className="editaccount__content__form__imgoverlay">launch</Icon>
                <input className="editaccount__content__form__imginput" type="file" name="image_url" id="image_url" onChange={this.handleChange} required autoComplete='false'/>
              </label>
            </div>
            <Input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              label="Naam"
              placeholder={this.props.user.name}
            />
            <Input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              label="E-mailadres"
              placeholder={this.props.user.email}
            />
            <Input
              type='text'
              name='knowledge'
              value={this.state.knowledge}
              onChange={this.handleChange}
              label="Kennis"
              placeholder={this.props.user.knowledge}
            />
            <Input
              type='text'
              name='available'
              value={this.state.available}
              onChange={this.handleChange}
              label="Beschikbaarheid"
              placeholder={this.props.user.available}
            />
            <input
              type="submit"
              value="Opslaan"
              className="login__content__form__submit"
            />
          </form>
        </main>
        <Footer />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Editaccount);
