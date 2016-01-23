import React, {PropTypes} from 'react';
import Editor from '../../Editor';
import {path, pipe} from 'ramda';

let getEventValue = path(['target', 'value']);
let toInt = val => +val;

export default class NumberEditor extends Editor {
  get input() {
    let {props} = this;
    let {name} = props;
    let onChange = pipe(getEventValue, toInt, props.onChange);
    return (
      <input
        id={name}
        name={name}
        onChange={onChange}
        required={props.required}
        type="number"
        value={props.value}
      />
    );
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