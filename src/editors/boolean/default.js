import React, {PropTypes} from 'react';
import Editor from '../../Editor';
import {path, pipe} from 'ramda';

let getEventValue = path(['target', 'checked']);

export default class BooleanEditor extends Editor {
  get input() {
    let {props} = this;
    let {name} = props;
    let onChange = pipe(getEventValue, props.onChange);
    return (
      <input
        id={name}
        name={name}
        onChange={onChange}
        type="checkbox"
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

BooleanEditor.propTypes = {
  value: PropTypes.bool
};
  
