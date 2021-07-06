import React from "react";

import AddMaterial from "../../components/addmaterial/AddMaterial"
import Material from "../../components/material/Material";

class MaterialList extends React.Component {

  render() {
    return(
      <section className="material-list">
        <AddMaterial updateList={this.props.updateList}/>
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
      </section>
    )
  }

}

export default MaterialList;
