import React, {PropTypes} from 'react';
import Editor from '../Editor';

export default class NumberEditor extends Editor {
  get input() {
    return (
      <input
        id={this.props.name}
        name={this.props.name}
        onChange={this.onChange.bind(this)}
        required={this.props.required}
        type="number"
        value={this.props.value}
      />
    );
  }

  onChange(event) {
    this.props.onChange(+event.target.value);
  }

  render() {
    return (
      <div>
        {this.label}
        {this.input}
      </div>
    );
  }
}

NumberEditor.propTypes = {
  value: PropTypes.number
};
