import React, {PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from '../Editor';
import classNames from 'classnames';

class BaseArrayEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.addEditor = this.addEditor.bind(this);
  }

  get columnClass() {
    const size = 12 / this.props.columns;
    return `col-sm-${size}`;
  }

  get editors() {
    const {props: {columns, value}} = this;

    let items = (value || []).map((val, key) => (
      <div className='panel-body'>
        {this.removeButton(key)}
        {this.editor(key, val)}
      </div>
    ));

    if (!items.length) {
      items.push(
        <div className='panel-body'>
          {`No ${this.title}`}
        </div>
      );
    }

    let rows = [];
    for (let i = 0, j = items.length; i < j; i += columns) {
      rows.push(
        <div
          className='row'
          key={i}
        >
          {items.slice(i, i + columns).map((item, column) => (
            <div
              className={this.columnClass}
              key={`${column}-column`}
            >
              {item}
            </div>
          ))}
        </div>
      );
    }

    return rows.concat([(
      <div
        className='panel-footer'
        key='footer'
      >
        {this.addButton}
      </div>
    )]);
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
      ...(this.props.value || []),
      undefined
    ]);
  }

  removeButton(key) {
    return (
      <button
        className='close'
        onClick={this.createEditorRemover(key)}
        type="button"
      >
        <i className='glyphicon glyphicon-remove'/>
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
        noTitle
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
}

BaseArrayEditor.propTypes = {
  ...Editor.propTypes,
  columns: PropTypes.number,
  info: PropTypes.array,
  items: PropTypes.object.isRequired,
  uniqueItems: PropTypes.bool,
  value: PropTypes.array
};

BaseArrayEditor.defaultProps = {
  ...Editor.defaultProps,
  columns: 1,
  info: [],
  uniqueItems: false,
  value: []
};

class FieldsetArrayEditor extends BaseArrayEditor {
  constructor(props, ...args) {
    super(props, ...args);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: props.open
    };
  }

  get editors() {
    return (
      <div className={classNames('collapse panel panel-default', {
        in: this.state.open
      })}>
        {super.editors}
      </div>
    );
  }

  get label() {
    return (
      <legend onClick={this.toggle}>
        <span
          className='caret'
          style={{marginRight: '10px'}}
        />
        {this.title}
      </legend>
    );
  }

  toggle() {
    this.setState({
      ...this.state,
      open: !this.state.open
    });
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

class PanelArrayEditor extends BaseArrayEditor {
  get label() {
    return (
      <div className='panel-heading'>
        {this.title}
      </div>
    );
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

export default class ArrayEditor extends BaseArrayEditor {
  render() {
    let Behaviour = this.props.level === 2
      ? FieldsetArrayEditor
      : PanelArrayEditor;
    return <Behaviour {...this.props}/>;
  }
}
