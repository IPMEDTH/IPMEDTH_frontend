import React from "react";
import Material from "../../components/material/Material";

class MaterialList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  // }

  // TODO: implement getmethod to update materials in here or with help of redux rather than inventory.js

  componentDidMount = () => {
    console.log("mounted MaterialList");
  }

  render() {
    return(
      <>
      {this.props.materials.map((item)=>(
        <Material
          itemId={item.id}
          name={item.name}
          description={item.description}
          amount={item.amount}
          unit={item.unit}
          location={item.location}
          added_by={item.added_by}
          img_url={item.img_url}
          key={item.amount + item.name + item.id}
          allAttributes={item}
          updateList={this.props.updateList}
        />
      ))}
      </>
    )
  }

}

export default MaterialList;
