import React, {PropTypes, Stylesheet} from 'react';
import Editor from '../Editor';
import Select from 'react-select';

const getValue = o => o.value;
const getValues = a => a.map(getValue);

export default class EnumEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.handleChange = this.handleChange.bind(this);
  }

  get input() {
    let {props} = this;
    return (
      <Select
        id={props.name}
        multi={props.multi}
        name={props.name}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
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
    const {props} = this;
    return props.value || (props.isRequired && props.enum[0]);
  }

  handleChange(selected) {
    let {props} = this;
    let value;
    if (selected) {
      value = props.multi ? getValues(selected) : selected.value;
    }
    props.onChange(value);
  }
}

EnumEditor.propTypes = {
  ...Editor.propTypes,
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
    let type = PropTypes[props.type];
    if (!type) {
      return new Error(`Cannot use an enum of type "${type}"`);
    }
    return type(props, propName, componentName);
  }
};

EnumEditor.defaultProps = {
  ...Editor.defaultProps,
  enum: [],
  multi: false
};
