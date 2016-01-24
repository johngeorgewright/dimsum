import React, {Component, PropTypes} from 'react';
import EditorFactory from '../../EditorFactory';
import Editor from '../../Editor';
import {assoc, keys} from 'ramda';

export default class ObjectEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.editor = this.editor.bind(this);
  }

  get editors() {
    return keys(this.props.properties).map(this.editor);
  }

  get label() {
    return (
      <legend>
        {this.title}
      </legend>
    );
  }

  get required() {
    return this.props.required.indexOf(name) !== -1;
  }

  editor(name, key) {
    let {props: {properties, value}} = this;
    return (
      <EditorFactory
        key={key}
        onChange={this.createUpdater(name)}
        name={name}
        required={this.required}
        value={value && value[name]}
        {...properties[name]}
      />
    );
  }

  createUpdater(name) {
    let {props} = this;
    return val => props.onChange(assoc(name, val, props.value));
  }

  render() {
    return (
      <fieldset>
        {this.label}
        {this.editors}
      </fieldset>
    );
  }
}

ObjectEditor.propTypes = {
  properties: PropTypes.object.isRequired,
  required: PropTypes.array,
  value: PropTypes.object
};

ObjectEditor.defaultProps = {
  required: [],
  value: {}
};
