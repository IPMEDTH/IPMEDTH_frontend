import React from "react";
import './youarenotadmin.scss';

class YouAreNotAdmin extends React.Component {
  render() {
    return(
        <article className="notadmin">
          <h3 className="notadmin__title"> Uh oh! </h3>
          <p className="notadmin__text">Om te te voorkomen dat de voorraad een rommeltje wordt, mogen alleen beheerders materialen toevoegen.</p>
          <p className="notadmin__text">Vraag aan een beheerder of ze jouw materiaal toe zouden kunnen voegen.</p>
          <div className="notadmin__close" onClick={this.props.closeModal}></div>
        </article>
    )
  }

}

export default YouAreNotAdmin;
