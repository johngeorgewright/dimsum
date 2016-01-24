import React, {PropTypes} from 'react';
import Editor from '../../Editor';

export default class NumberEditor extends Editor {
  get input() {
    let {props} = this;
    let {name} = props;
    return (
      <input
        id={name}
        name={name}
        onChange={this.onChange.bind(this)}
        required={props.required}
        type="number"
        value={props.value}
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

NumberEditor.enumerable = true;
