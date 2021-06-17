import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from '@material-ui/core';
import logo from '../../images/logo.png';
import './Header.scss';
import axios from "axios";
import UrlService from "../../services/UrlService";
import { changeUser } from "../../redux/actions";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount = () => {

    axios.defaults.withCredentials = true;
    axios.get(UrlService.getUser())
    .then(response => {
      console.log(response.data)
      this.props.dispatch(changeUser(response.data));
    })
    .catch(response => {
      console.log(response.error)
    });
  }

  render() {

    return(
        <header className="header">
            <Link to="/">
                <figure className="header__figure">
                    <img src={logo} alt="Logo van The Space"/>
                </figure>
            </Link>
            <Link to="login" className={this.props.isLoggedIn ? 'header__hidden' : ''}>
              <Icon className="loginIcon">login</Icon>
            </Link>
            <Link to="account" className={this.props.isLoggedIn ? '' : 'header__hidden'}>
              <Icon className="loginIcon">account_circle</Icon>
            </Link>

        </header>
    );
  }
}

// Get isLoggedIn from state and map it to props
const mapStateToProps = state => {
  return {
      isLoggedIn: state.user

  }
}

export default connect(mapStateToProps)(Header);
