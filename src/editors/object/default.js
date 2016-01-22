import React, {Component, PropTypes} from 'react';
import EditorFactory from '../../EditorFactory';
import Editor from '../../Editor';
import {__, assoc, keys, partial, pipe} from 'ramda';

export default class ObjectEditor extends Editor {
  get editors() {
    let {props} = this;
    let {properties, value} = props;
    let updateValue = assoc(__, __, props.value);
    let onChange = pipe(updateValue, props.onChange);
    return keys(properties).map((name, key) => (
      <EditorFactory
        key={key}
        onChange={val => onChange(name, val)}
        name={name}
        required={props.required.indexOf(name) !== -1}
        value={value && value[name]}
        {...properties[name]}
      />
    ));
  }

  get label() {
    return (
      <legend>
        {this.title}
      </legend>
    );
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
