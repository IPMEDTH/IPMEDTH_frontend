import React from "react";

import History from "./History";

class HistoryList extends React.Component {

  render() {
    return(
      <section className="history__list">
        {this.props.history.map((item)=>(
          <History
            itemId={item.id}
            name={item.name}
            amount={item.amount}
            unit={item.unit}
            updated_by={item.updated_by}
            updated_at={item.updated_at}
            img_url={item.img_url}
            modification={item.modification}
            key={item.amount + item.name + item.id}
            allAttributes={item}
            updateList={this.props.updateList}
          />
        ))}
      </section>
    )
  }

}

export default HistoryList;
