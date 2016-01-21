import React, {PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from './editor';
import {append} from 'ramda';

export default class ArrayEditor extends Editor {
  get editors() {
    let {props} = this;
    console.log(props);
    return props.value.map((val, key) => (
      <EditorFactory
        key={key}
        name={`${props.name}[${key}]`}
        onChange={val => this.onChange(key, val)}
        value={val}
        {...props.items}
      />
    ));
  }

  onChange(key, value) {
    this.props.onChange(assoc(key, value, this.props.value));
  }

  addEditor() {
    this.props.onChange(append('', this.props.value));
  }

  render() {
    return (
      <fieldset>
        <legend>
          {this.title}
        </legend>
        {this.editors}
        <button
          onClick={() => this.addEditor()}
          type="button"
        >
          {`Add ${this.title}`}
        </button>
      </fieldset>
    );
  }
}

ArrayEditor.propTypes = {
  items: PropTypes.object.isRequired,
  uniqueItems: PropTypes.bool,
  value: PropTypes.array
};

ArrayEditor.defaultProps = {
  uniqueItems: false,
  value: []
};
