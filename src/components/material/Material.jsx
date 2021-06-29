import React from "react";
import UrlService from "../../services/UrlService";

class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // itemId: this.props.itemId,
      // name: this.props.name,
      // description: this.props.description,
      // amount: this.props.amount,
      // unit: this.props.unit,
      // added_by: this.props.added_by,
      // location: this.props.location,
      // img_url: this.props.img_url,
      showAttributes: false,
    };
  }

  toggleItem = () => {
    switch (this.state.showAttributes) {
      case false:
        this.setState({showAttributes: true})
        break;
      case true:
        this.setState({showAttributes: false})
        break;
    }
  }

  render() {
    return(
      <section className="inventory__content-item" onClick={this.toggleItem}>
        <article className="inventory__content-item__info">
          <h3 className="inventory__content-item__info__title"> {this.props.name}</h3>
          {this.state.showAttributes===false ?
             null
             :
             <>
               <p className="inventory__content-item__info__amount"> {this.props.amount} {this.props.unit}</p>
               <p className="inventory__content-item__info__description attributes"> {this.props.description}</p>
               {/*<p className="inventory__content-item__info__addedby attributes"> {this.props.added_by}</p>*/}
               <p className="inventory__content-item__info__location attributes"> {this.props.location}</p>
            </>
           }
        </article>
        <figure className="inventory__content-item__info__figure">
          <img className="inventory__content-item__info__figure__image" src={UrlService.MaterialImage(this.props.img_url)} alt={"Foto van " + this.props.name}></img>
        </figure>
      </section>
    )
  }

}

export default Material;
