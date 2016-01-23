import React, {PropTypes} from 'react';
import Editor from '../../Editor';

export default class EnumEditor extends Editor {
  get input() {
    return (
      <select
        id={props.name}
        name={props.name}
        onChange={this.onChange.bind(this)}
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
  enum: PropTypes.array
};

EnumEditor.defaultProps = {
  enum: []
};
