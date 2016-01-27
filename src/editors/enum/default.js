import React, {PropTypes, Stylesheet} from 'react';
import Editor from '../../Editor';
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
    return props.value || (props.required && props.enum[0]);
  }

  onChange(selected) {
    let {props} = this;
    props.onChange(props.multi ? selected.map(getValue) : selected.value);
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
  defaultValue: PropTypes.any,
  enum: PropTypes.array,
  multi: PropTypes.bool
};

EnumEditor.defaultProps = {
  enum: [],
  multi: false
};
