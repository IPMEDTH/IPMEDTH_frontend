import React from "react";
import './deletematerial.scss';

class DeleteMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areYouSure: false,
    };
  }

  deleteConfirmation = () => {
    this.setState({areYouSure: true});
  }

  render() {
    return(
      <section className="deletematerial">
      {this.state.areYouSure===false ?
        <button className="deletematerial__button" onClick={this.deleteConfirmation}/>
      :
        <article className="deletematerial__areyousure">
          <h3> Materiaal permanent verwijderen? </h3>
          <button className="deletematerial__areyousure__yes" onClick={this.props.onClick}> Verwijder </button>
        </article>
      }
      </section>
    )
  }

}

export default DeleteMaterial;
