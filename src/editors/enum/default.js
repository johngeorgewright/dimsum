import React, {PropTypes} from 'react';
import Editor from '../../Editor';

export default class EnumEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.onChange = this.onChange.bind(this);
    this.option = this.option.bind(this);
  }

  get input() {
    let {props} = this;
    return (
      <select
        id={props.name}
        name={props.name}
        onChange={this.onChange}
        value={this.value}
      >
        {this.options}
      </select>
    );
  }

  get value() {
    let {props} = this;
    return props.value || (props.required && props.enum[0]);
  }

  get options() {
    let {props} = this;
    let options = props.required ? [] : [this.option(null, -1)];
    return options.concat(props.enum.map(this.option));
  }

  option(value, key) {
    return (
      <option
        key={key}
        value={value}
      >
        {value}
      </option>
    );
  }

  onChange(event) {
    this.props.onChange(event.target.value);
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
  enum: PropTypes.array
};

EnumEditor.defaultProps = {
  enum: []
};
