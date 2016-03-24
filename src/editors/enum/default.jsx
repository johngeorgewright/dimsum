import React, {PropTypes, Stylesheet} from 'react';
import Editor from '../../Editor.jsx';
import Select from 'react-select';
import {prop} from 'ramda';

let getValue = prop('value');

export default class EnumEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.onChange = this.onChange.bind(this);
  }

  get input() {
    let {props} = this;
    return (
      <Select
        id={props.name}
        multi={props.multi}
        name={props.name}
        onChange={this.onChange}
        options={this.options}
        value={this.value}
      >
        {this.options}
      </Select>
    );
  }

  get options() {
    return this.props.enum.map(option => ({
      label: option,
      value: option
    }));
  }

  get value() {
    let {props} = this;
    return props.value || (props.isRequired && props.enum[0]);
  }

  onChange(selected) {
    let {props} = this;
    props.onChange(props.multi ? (selected || []).map(getValue) : selected.value);
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
  enum: PropTypes.array,
  multi: PropTypes.bool,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  value: (props, propName, componentName) => {
    if (typeof props[propName] === 'undefined') {
      return;
    }
    let type;
    switch (props.type) {
    case 'string':
      type = PropTypes.string;
      break;
    case 'number':
      type = PropTypes.number;
      break;
    default:
      return new Error(`Cannot use an enum of type "${type}"`);
    }
    return PropTypes.arrayOf(type)(props, propName, componentName);
  }
};

EnumEditor.defaultProps = {
  enum: [],
  multi: false
};
