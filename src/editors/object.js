import React, {Component, PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from './editor';
import {assoc} from 'ramda';

export default class ObjectEditor extends Editor {
  get editors() {
    let {properties, value} = this.props;
    return Object.keys(properties).map((name, key) => (
      <EditorFactory
        key={key}
        name={name}
        onChange={val => this.onChange(name, val)}
        value={value && value[name]}
        {...properties[name]}
      />
    ));
  }

  onChange(name, value) {
    this.props.onChange(assoc(name, value, this.props.value));
  }

  render() {
    return (
      <fieldset>
        <legend>
          {this.title}
        </legend>
        {this.editors}
      </fieldset>
    );
  }
}

ObjectEditor.propTypes = {
  properties: PropTypes.object.isRequired,
  value: PropTypes.object
};

ObjectEditor.defaultProps = {
  value: {}
};
