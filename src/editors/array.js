import React, {PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from '../Editor';

export default class ArrayEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.addEditor = this.addEditor.bind(this);
  }

  get editors() {
    const {props: {value}} = this;
    const isLast = i => i === (this.props.value.length - 1);

    let result = [];

    (value || []).forEach((val, key) => {
      result.push(
        <div
          className='panel-body'
          key={`${key}-editor`}
        >
          {this.editor(key, val)}
        </div>
      );
      result.push(
        <div
          className='panel-footer'
          key={`${key}-footer`}
        >
          {isLast(key)
            ? (
            <div className='btn-group'>
              {this.removeButton(key)}
              {this.addButton}
            </div>
            ) : this.removeButton(key)
          }
        </div>
      );
    });

    if (!result.length) {
      result.push(
        <div
          className='panel-body'
          key='body'
        >
          {`No ${this.title}`}
        </div>
      );
      result.push(
        <div
          className='panel-footer'
          key='footer'
        >
          {this.addButton}
        </div>
      );
    }

    return result;
  }

  get label() {
    return (
      <div className='panel-heading'>
        {this.title}
      </div>
    );
  }

  get addButton() {
    return (
      <button
        className='btn'
        onClick={this.addEditor}
        type="button"
      >
        <i className='glyphicon glyphicon-plus'/>
      </button>
    );
  }

  addEditor() {
    this.props.onChange([
      ...this.props.value,
      undefined
    ]);
  }

  removeButton(key) {
    return (
      <button
        className='btn'
        onClick={this.createEditorRemover(key)}
        type="button"
      >
        <i className='glyphicon glyphicon-minus'/>
      </button>
    );
  }

  createEditorRemover(key) {
    const {props} = this;
    return () => props.onChange([
      ...props.value.slice(0, key),
      ...props.value.slice(key + 1)
    ]);
  }

  editorName(key) {
    return '' + (key + 1);
  }

  editor(key, val) {
    return (
      <EditorFactory
        info={this.props.info[key]}
        level={this.props.level + 1}
        name={this.editorName(key)}
        title=''
        onChange={this.createEditorUpdater(key)}
        onInfo={this.createInfoUpdater(key)}
        theme={this.props.theme}
        value={val}
        {...this.props.items}
      />
    );
  }

  createEditorUpdater(key) {
    const {props} = this;
    return val => props.onChange([
      ...props.value.slice(0, key),
      val,
      ...props.value.slice(key + 1)
    ]);
  }

  createInfoUpdater(key) {
    const {props} = this;
    return val => props.onInfo([
      ...props.info.slice(0, key),
      val,
      ...props.info.slice(key + 1)
    ]);
  }

  render() {
    return (
      <div className='panel panel-default'>
        {this.label}
        {this.editors}
      </div>
    );
  }
}

ArrayEditor.propTypes = {
  ...Editor.propTypes,
  info: PropTypes.array,
  items: PropTypes.object.isRequired,
  uniqueItems: PropTypes.bool,
  value: PropTypes.array
};

ArrayEditor.defaultProps = {
  ...Editor.defaultProps,
  info: [],
  uniqueItems: false,
  value: []
};
