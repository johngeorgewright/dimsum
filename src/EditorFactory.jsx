import React, {Component, PropTypes} from 'react';
import * as editors from './editors';
import {lensProp, omit, pipe, set} from 'ramda';

const setRequired = set(lensProp('required'));

export default class EditorFactory extends Component {
  get Editor() {
    let Editor = editors[this.props.type].default;
    return this.props.enum && Editor && Editor.enumerable
      ? editors.enumerable.default
      : Editor;
  }

  render() {
    let Editor = this.Editor;
    return Editor
      ? <Editor {...this.props}/>
      : <div/>;
  }
}

EditorFactory.propTypes = {
  enum: PropTypes.array,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
