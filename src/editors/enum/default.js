import React, {PropTypes} from 'react';
import Editor from '../../Editor';

export default class EnumEditor extends Editor {
  get input() {
    let {props} = this;
    return (
      <select
        id={props.name}
        name={props.name}
        onChange={this.onChange.bind(this)}
        value={props.value === undefined ? props.defaultValue : props.value}
      >
        {this.options}
      </select>
    );
  }

  get options() {
    let {props} = this;
    let options = props.required ? [] : [(
      <option
        key={-1}
        value={null}
      >
        {''}
      </option>
    )];
    return options.concat(props.enum.map((option, key) => (
      <option
        key={key}
        value={option}
      >
        {option}
      </option>
    )));
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
