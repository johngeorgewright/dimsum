import React, {PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from '../Editor';
import {__, append, inc, pipe, remove, toString, update} from 'ramda';

const editorName = pipe(inc, toString);
const addItem = append(undefined);
let removeAtIndex = remove(__, 1);

export default class ArrayEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.addEditor = this.addEditor.bind(this);
  }

  get editors() {
    return this.props.value.map((val, key) => (
      <div key={key}>
        {this.editor(key, val)}
        {this.removeButton(key)}
      </div>
    ));
  }

  get label() {
    return (
      <legend>
        {this.title}
      </legend>
    );
  }

  get addButton() {
    return (
      <button
        onClick={this.addEditor}
        type="button"
      >
        {`Add ${this.title}`}
      </button>
    );
  }

  addEditor() {
    this.props.onChange(addItem(this.props.value));
  }

  removeButton(key) {
    return (
      <button
        onClick={this.createEditorRemover(key)}
        type="button"
      >
        {'Remove'}
      </button>
    );
  }

  createEditorRemover(key) {
    let {props} = this;
    return () => props.onChange(removeAtIndex(key, props.value));
  }

  editor(key, val) {
    return (
      <EditorFactory
        name={editorName(key)}
        onChange={this.createEditorUpdater(key)}
        theme={this.props.theme}
        value={val}
        {...this.props.items}
      />
    );
  }

  createEditorUpdater(key) {
    let {props} = this;
    return val => props.onChange(update(key, val, props.value));
  }

  render() {
    return (
      <fieldset>
        {this.label}
        {this.editors}
        {this.addButton}
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
