import React from "react";
import UrlService from "../../services/UrlService";
// import Modal from 'react-modal';

import EditMaterialModal from "../../components/editmaterialmodal/EditMaterialModal"

class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAttributes: false,
      showModal: false,
      showSuccessComponent: false,
      outOfStock: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false,
    showSuccessComponent: false })
    this.getMaterialsData();  // update material list
    this.checkOutOfStock();
  }

  checkOutOfStock = () => {
    if (this.props.amount === 0 || this.props.amount === "0") {
      this.setState({outOfStock: true})
    } else {
      this.setState({outOfStock: false})
    }
  }

  componentDidMount = () =>{
    this.checkOutOfStock()
  };

  toggleItem = (e) => {
    if (e.target.className!=="inventory__content-item" && e.target.className!=="inventory__content-item__outofstock") {
      return
    }
    switch (this.state.showAttributes) {
      case false:
        this.setState({showAttributes: true})
        break;
      case true:
        this.setState({showAttributes: false})
        break;
      default:
    }
  }

  render() {
    return(
      <>
      <section className="inventory__content-item" onClick={this.toggleItem}>
        {this.state.outOfStock===false ?
           null
           :
           <div className="inventory__content-item__outofstock" onClick={this.toggleItem}>
            <p className="inventory__content-item__outofstock__text">Niet op voorraad</p>
           </div>
         }
        <article className="inventory__content-item__info">
          <h3 className="inventory__content-item__info__title"> {this.props.name}</h3>
          {this.state.showAttributes===false ?
             null
             :
             <>
               <p className="inventory__content-item__info__amount"> {this.props.amount} {this.props.unit}</p>
               <p className="inventory__content-item__info__description"> {this.props.description}</p>
               {/*<p className="inventory__content-item__info__addedby"> {this.props.added_by}</p>*/}
               <p className="inventory__content-item__info__location"> {this.props.location}</p>
            </>
           }
        </article>
        <figure className="inventory__content-item__info__figure">
          <img className="inventory__content-item__info__figure__image" src={UrlService.MaterialImage(this.props.img_url)} alt={"Foto van " + this.props.name}></img>
        </figure>
        {this.state.showAttributes===false ?
           null
           :
           <EditMaterialModal materialAttributes={this.props.allAttributes} updateList={this.props.updateList} stockCheck={this.checkOutOfStock}/>
         }
      </section>
      </>
    )
  }

}

export default Material;
