import React, {PropTypes} from 'react';
import Editor from '../../Editor';
import {path, pipe} from 'ramda';

let getEventValue = path(['target', 'value']);

export default class EnumEditor extends Editor {
  get input() {
    let {props} = this;
    let onChange = pipe(getEventValue, props.onChange);
    return (
      <select
        id={props.name}
        name={props.name}
        onChange={onChange}
      >
        {this.options}
      </select>
    );
  }

  get options() {
    return this.props.enum.map((option, key) => (
      <option
        key={key}
        value={option}
      >
        {option}
      </option>
    ));
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

EnumEditor.propTypes = {
  enum: PropTypes.array
};

EnumEditor.defaultProps = {
  enum: []
};
