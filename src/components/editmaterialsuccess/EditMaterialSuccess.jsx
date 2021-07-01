import React from "react";
// import UrlService from "../../services/UrlService";

class EditMaterialSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
        <section className="addmaterial__success">
          <h2 className="addmaterial__title"> MATERIAAL AANPASSEN...</h2>
          <div className="addmaterial__titlebar"></div>
          <p className="addmaterial__success__text"> Het materiaal is aangepast! </p>
          <div className="addmaterial__success__close" onClick={this.props.closeModal}></div>
        </section>
    )
  }

}

export default EditMaterialSuccess;
