import React, {PropTypes} from 'react';
import Editor from '../../Editor';
import {path, pipe} from 'ramda';

let getEventValue = path(['target', 'value']);

export default class StringEditor extends Editor {
  get input() {
    let {props} = this;
    let onChange = pipe(getEventValue, props.onChange);
    return (
      <input
        id={props.name}
        name={props.name}
        onChange={onChange}
        required={props.required}
        type="text"
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

StringEditor.propTypes = {
  value: PropTypes.string
};

StringEditor.enumerable = true;
