import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import UrlService from "../../services/UrlService";
import TokenItem from "./TokenItem";

class TokenItemList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        users: []
    };
  }

  getUsers() {
    axios.get(UrlService.getUsers()).then(response => {
      this.setState({
        users: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      this.props.user.tokens ? this.props.user.tokens.map(user =>
        <TokenItem
          name={user.name}
          email={user.email}
          email_verified_at={user.email_verified_at}
          knowledge={user.knowledge}
          available={user.available}
          isadmin={user.isadmin}
          id={user.id}
          image_url={user.image_url}
          key={user.id}
        />
      ) : ''
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TokenItemList);
