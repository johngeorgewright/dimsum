import React, {PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from './editor';
import {append, adjust, inc, remove} from 'ramda';

export default class ArrayEditor extends Editor {
  get editors() {
    return this.props.value.map((val, key) => (
      <div key={key}>
        {this.editor(key, val)}
        {this.removeButton(key)}
      </div>
    ));
  }

  removeButton(key) {
    return (
      <button
        onClick={() => this.removeEditor(key)}
        type="button"
      >
        {'Remove'}
      </button>
    );
  }

  editor(key, val) {
    let {props} = this;
    return (
      <EditorFactory
        name={'' + inc(key)}
        onChange={val => this.onChange(key, val)}
        value={val}
        {...props.items}
      />
    );
  }

  onChange(key, value) {
    this.props.onChange(adjust(() => value, key, this.props.value));
  }

  defaultValueForEditor() {
    switch (this.props.items.type) {
    case 'string':
      return '';
    case 'object':
      return {};
    case 'array':
      return [];
    case 'number':
      return 0;
    }
  }

  addEditor() {
    this.props.onChange(append(this.defaultValueForEditor(), this.props.value));
  }

  removeEditor(key) {
    this.props.onChange(remove(key, 1, this.props.value));
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
