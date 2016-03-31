import React, {PropTypes, Stylesheet} from 'react';
import Editor from '../Editor';
import Select from 'react-select';
import {both, either, head, map, pipe, prop} from 'ramda';

const isRequired = prop('isRequired');
const whenRequired = both(isRequired);
const firstEnumValue = pipe(prop('enum'), head);
const getValue = prop('value');
const getValues = map(getValue);

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
    return either(getValue, whenRequired(firstEnumValue))(this.props);
  }

  onChange(selected) {
    let {props} = this;
    let value;
    if (selected) {
      value = props.multi ? getValues(selected) : selected.value;
    }
    props.onChange(value);
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
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  value: (props, propName, componentName) => {
    if (typeof props[propName] === 'undefined') {
      return;
    }
    let type = PropTypes[props.type];
    if (!type) {
      return new Error(`Cannot use an enum of type "${type}"`);
    }
    return type(props, propName, componentName);
  }
};

EnumEditor.defaultProps = {
  enum: [],
  multi: false
};
