import React from "react";
import Material from "../../components/material/Material";

class MaterialList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return(
      <>
      {this.props.materials.map((item)=>(
        <Material
          name={item.name}
          description={item.description}
          amount={item.amount}
          unit={item.unit}
          added_by={item.added_by}
          img_url={item.img_url}
          key={item.id}
        />
      ))}
      </>
    )
  }

}

export default MaterialList;
