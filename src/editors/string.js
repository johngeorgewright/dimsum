import React, {PropTypes} from 'react';
import Editor from './editor';

export default class StringEditor extends Editor {
  get label() {
    return (
      <label htmlFor={this.props.name}>
        {this.title}
      </label>
    );
  }

  get input() {
    return (
      <input
        id={this.props.name}
        name={this.props.name}
        onChange={this.props.onChange}
        type="text"
        value={this.props.value}
      />
    );
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

StringEditor.defaultProps = {
  value: ''
};
