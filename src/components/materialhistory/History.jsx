import React from "react";
import UrlService from "../../services/UrlService";
import increaseIcon from '../../images/call_received_black_24dp.svg';
import decreaseIcon from '../../images/call_made_black_24dp.svg';
import unchangedIcon from '../../images/update_black_24dp.svg';
// import Modal from 'react-modal';

// import EditMaterialModal from "../../components/editmaterialmodal/EditMaterialModal"

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      increaseIcon: increaseIcon,
      decreaseIcon: decreaseIcon,
      unchangedIcon: unchangedIcon,
    };
  }

  setIcon = (modification) => {
    switch (modification) {
      case 'increase':
        return this.state.increaseIcon;
      case 'decrease':
        return this.state.decreaseIcon;
      case 'unchanged':
        return this.state.unchangedIcon;
      default:

    }
  }

  render() {
    return(

      <section className="history__content-item">
        <article className="history__content-item__info">
          <h3 className="history__content-item__info__title"> {this.props.name}</h3>
          <p className="history__content-item__info__description"> {this.props.modification}</p>
          <p className="history__content-item__info__amount"> {this.props.amount} {this.props.unit}</p>
          <p className="history__content-item__info__addedby"> {this.props.updated_by}</p>
          <p className="history__content-item__info__addedby"> {this.props.updated_at}</p>
        </article>
        <section className="history__content-item-figurecontainer">
        <figure className="history__content-item__info__figure">
          <img className="history__content-item__info__figure__icon" src={this.setIcon(this.props.modification)} alt="Icoon"></img>
        </figure>
        <figure className="history__content-item__info__figure">
          <img className="history__content-item__info__figure__image" src={UrlService.MaterialImage(this.props.img_url)} alt={"Foto van " + this.props.name}></img>
        </figure>
        </section>
      </section>
    )
  }

}

export default History;
