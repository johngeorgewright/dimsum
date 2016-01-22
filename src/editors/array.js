import React, {PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from '../Editor';
import {__, always, append, inc, pipe, remove, toString, update} from 'ramda';

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
    let addEditor = pipe(
      () => append(undefined, this.props.value),
      this.props.onChange
    );
    return (
      <button
        onClick={addEditor}
        type="button"
      >
        {`Add ${this.title}`}
      </button>
    );
  }

  removeButton(key) {
    let removeEditor = pipe(
      () => remove(key, 1, this.props.value),
      this.props.onChange
    );
    return (
      <button
        onClick={removeEditor}
        type="button"
      >
        {'Remove'}
      </button>
    );
  }

  editor(key, val) {
    let {props} = this;
    let updateEditor = pipe(
      update(key, __, props.value),
      props.onChange
    );
    return (
      <EditorFactory
        name={editorName(key)}
        onChange={updateEditor}
        value={val}
        {...props.items}
      />
    );
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
