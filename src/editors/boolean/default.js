import React, {PropTypes} from 'react';
import Editor from '../../Editor';

export default class BooleanEditor extends Editor {
  get input() {
    let {props: {name}} = this;
    return (
      <input
        id={name}
        name={name}
        onChange={this.onChange.bind(this)}
        type="checkbox"
      />
    );
  }

  onChange(event) {
    this.props.onChange(event.target.checked);
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

BooleanEditor.propTypes = {
  value: PropTypes.bool
};
