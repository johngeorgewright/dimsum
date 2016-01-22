import React, {PropTypes} from 'react';
import Editor from '../Editor';
import {path, pipe} from 'ramda';

let getEventValue = path(['target', 'value']);

export default class NumberEditor extends Editor {
  get input() {
    let {props} = this;
    let onChange = pipe(getEventValue, props.onChange);
    return (
      <input
        id={props.name}
        name={props.name}
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
