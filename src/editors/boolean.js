import React, {PropTypes} from 'react';
import Editor from '../Editor';
import classNames from 'classnames';

export default class BooleanEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.handleChange = this.handleChange.bind(this);
  }

  get label() {
    return this.title;
  }

  get input() {
    let {props: {name}} = this;
    return (
      <input
        checked={this.props.value}
        id={name}
        name={name}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        type="checkbox"
      />
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.checked);
  }

  render() {
    return (
      <div className={classNames('checkbox', {
          'has-warning': this.usersThatAreFocused.length
      })}>
        <label>
          {this.input}
          {this.label}
        </label>
        {this.collaborators}
      </div>
    );
  }
}

BooleanEditor.propTypes = {
  ...Editor.propTypes,
  value: PropTypes.bool
};
