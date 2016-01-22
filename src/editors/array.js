import React, {PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from '../Editor';
import {__, append, inc, pipe, remove, toString, update} from 'ramda';

let editorName = pipe(inc, toString);

export default class ArrayEditor extends Editor {
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
        onClick={() => this.addEditor()}
        type="button"
      >
        {`Add ${this.title}`}
      </button>
    );
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
    let updateValue = update(key, __, props.value);
    let onChange = pipe(updateValue, props.onChange);
    return (
      <EditorFactory
        name={editorName(key)}
        onChange={onChange}
        value={val}
        {...props.items}
      />
    );
  }

  addEditor() {
    this.props.onChange(append(undefined, this.props.value));
  }

  removeEditor(key) {
    this.props.onChange(remove(key, 1, this.props.value));
  }

  render() {
    let {props} = this.props;
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
