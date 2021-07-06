import React from "react";
import './deletematerial.scss';

class DeleteMaterial extends React.Component {

  render() {
    return(
      <section className="deletematerial">
        <button className="deletematerial__button" onClick={this.props.onClick}/>
      </section>
    )
  }

}

export default DeleteMaterial;
