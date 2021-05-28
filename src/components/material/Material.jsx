import React from "react";

class Material extends React.Component {
  render() {
    return(
      <>
        <p> test</p>
        <p> {this.props.name}</p>
        <p> {this.props.description}</p>
        <p> {this.props.amount}</p>
        <p> {this.props.unit}</p>
        <p> {this.props.added_by}</p>
        <p> {this.props.img_url}</p>
       </>
    )
  }

}

export default Material;
