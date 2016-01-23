import React, {PropTypes} from 'react';
import EditorFactory from '../../EditorFactory';
import Editor from '../../Editor';
import {__, append, inc, pipe, remove, toString, update} from 'ramda';

let editorName = pipe(inc, toString);
let addItem = append(undefined);
let removeAtIndex = remove(__, 1);

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
    let {props} = this;
    return (
      <button
        onClick={() => props.onChange(addItem(props.value))}
        type="button"
      >
        {`Add ${this.title}`}
      </button>
    );
  }

  removeButton(key) {
    let {props} = this;
    return (
      <button
        onClick={() => props.onChange(removeAtIndex(key, props.value))}
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
        name={editorName(key)}
        onChange={val => props.onChange(update(key, val, props.value))}
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