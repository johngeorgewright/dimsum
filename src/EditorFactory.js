import React, {Component, PropTypes} from 'react';
import * as editors from './editors';
import {omit} from 'ramda';

export default class EditorFactory extends Component {
  get editorProps() {
    return omit(['type'], this.props);
  }

  get Editor() {
    let Editor = editors[this.props.type]['default'];
    return this.editorProps.enum && Editor && Editor.enumerable
      ? editors.enumerable.default
      : Editor;
  }

  render() {
    let Editor = this.Editor;
    return Editor
      ? <Editor {...this.editorProps}/>
      : <div/>;
  }
}

EditorFactory.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
