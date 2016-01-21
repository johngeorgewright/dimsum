import React, {Component, PropTypes} from 'react';

export default class StringEditor extends Component {
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

  get title() {
    return this.props.title || this.props.name;
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
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string
};
