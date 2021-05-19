import React from "react";
import './input.scss';

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } onChange={this.props.handleChange} placeholder={ this.props.placeholder } required autoComplete='false'/>
              <label htmlFor={ this.props.name } ></label>
           </div>
  }

}

export default Input;
