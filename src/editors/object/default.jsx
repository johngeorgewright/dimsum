import React, {Component, PropTypes} from 'react';
import EditorFactory from '../../EditorFactory.jsx';
import Editor from '../../Editor.jsx';
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

  isRequired(name) {
    return this.props.required.indexOf(name) !== -1;
  }

  editor(name, key) {
    let {props: {properties, value}} = this;
    return (
      <EditorFactory
        isRequired={this.isRequired(name)}
        key={key}
        name={name}
        onChange={this.createUpdater(name)}
        value={value[name]}
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
