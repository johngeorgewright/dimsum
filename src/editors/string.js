import React, {PropTypes} from 'react';
import Editor from '../Editor';

export default class StringEditor extends Editor {
  constructor(props, ...args) {
    super(props, ...args);
    this.handleChange = this.handleChange.bind(this);
  }

  get input() {
    let {props} = this;
    return (
      <input
        className='form-control'
        id={props.name}
        name={props.name}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        required={props.isRequired}
        type="text"
        value={props.value}
      />
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }
}

StringEditor.propTypes = {
  ...Editor.propTypes,
  info: PropTypes.object,
  value: PropTypes.string
};

StringEditor.defaultProps = {
  ...Editor.defaultProps,
  info: {},
  value: ''
};

StringEditor.enumerable = true;
