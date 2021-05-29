import React from 'react';
import './searchbar.css';

class SearchBar extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onCheck}
            className="searchbar__form">
        <input
         className="searchbar__form__input"
         key="random1"
         name={this.props.name}
         value={this.props.input}
         placeholder={"Search material"}
         onChange={this.props.onChange}
        />
      </form>
    );
  }
}

export default SearchBar
