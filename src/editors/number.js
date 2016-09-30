import React, {PropTypes} from 'react';
import Editor from '../Editor';

export default class NumberEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.handleChange = this.handleChange.bind(this);
  }

  get input() {
    let {props} = this;
    let {name} = props;
    return (
      <input
        className='form-control'
        id={name}
        name={name}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        required={props.isRequired}
        type="number"
        value={props.value || ''}
      />
    );
  }

  handleChange(event) {
    this.props.onChange(+event.target.value);
  }
}

NumberEditor.propTypes = {
  ...Editor.propTypes,
  value: PropTypes.number
};

NumberEditor.defaultProps = {
  ...Editor.defaultProps,
  value: 0
};

NumberEditor.enumerable = true;
