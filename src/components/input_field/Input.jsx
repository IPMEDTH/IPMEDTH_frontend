import React from "react";
import './input.scss';

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <label htmlFor={ this.props.name } ></label>
              <input className="input__field" type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } value={this.props.value} onChange={this.props.onChange} required autoComplete='false'/>
           </div>
  }

}

export default Input;
