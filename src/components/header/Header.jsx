import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from '@material-ui/core';
import logo from '../../images/logo.png';
import './Header.scss';
import axios from "axios";
import UrlService from "../../services/UrlService";
import { changeUser } from "../../redux/actions";
import { createBrowserHistory } from "history";
import queryString from 'query-string';

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
      // console.log(response.data)
      this.props.dispatch(changeUser(response.data));
    })
    .catch(response => {
      console.log(response.error)
    });

    if(queryString.parse(this.props.location.search).verified === '1') {
      alert('E-mailvalidatie gelukt!')
    }
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
            <Link to={createBrowserHistory().location.pathname === "/account" ? 'editaccount' : 'account'} className={this.props.isLoggedIn ? '' : 'header__hidden'}>
              <Icon className="loginIcon">{createBrowserHistory().location.pathname === "/account" ? 'edit' : 'account_circle'}</Icon>
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

export default connect(mapStateToProps)(withRouter(Header));
