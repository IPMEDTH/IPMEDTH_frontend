import React from "react";
import { Link } from "react-router-dom";
import { Icon } from '@material-ui/core';
import logo from '../../images/logo.png';
import './Header.scss';

class Header extends React.Component {
  render() {

    return(
        <header className="header">
            <Link to="/">
                <figure className="header__figure">
                    <img src={logo} alt="Logo van The Space"/>
                </figure>
            </Link>
            <Link to="login">
              <Icon className="loginIcon">login</Icon>
            </Link>
        </header>
    );
  }
}

export default Header;
