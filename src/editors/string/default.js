import React, {PropTypes} from 'react';
import Editor from '../../Editor';

export default class StringEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.onChange = this.onChange.bind(this);
  }

  get input() {
    let {props} = this;
    return (
      <input
        id={props.name}
        name={props.name}
        onChange={this.onChange}
        required={props.required}
        type="text"
        value={props.value}
      />
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

StringEditor.propTypes = {
  value: PropTypes.string
};

StringEditor.enumerable = true;
