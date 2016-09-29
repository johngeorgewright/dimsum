import React, {Component, PropTypes} from 'react';
import EditorFactory from '../EditorFactory';
import Editor from '../Editor';

class BaseObjectEditor extends Editor {
  constructor(...args) {
    super(...args);
    this.editor = this.editor.bind(this);
  }

  get editors() {
    return Object.keys(this.props.properties).map(this.editor);
  }

  isRequired(name) {
    return this.props.required.indexOf(name) !== -1;
  }

  editor(name, key) {
    const {props} = this;
    const {properties, value} = props;
    return (
      <EditorFactory
        {...properties[name]}
        info={props.info[name]}
        isRequired={this.isRequired(name)}
        key={key}
        level={props.level + 1}
        name={name}
        onChange={this.createUpdater(name)}
        onInfo={this.createInfoUpdater(name)}
        theme={props.theme}
        value={value && value[name]}
      />
    );
  }

  createUpdater(name) {
    let {props} = this;
    return val => props.onChange(
      {
        ...props.value,
        [name]: val
      },
      {
        [name]: val
      }
    );
  }

  createInfoUpdater(name) {
    let {props} = this;
    return (val = {}) => props.onInfo({
      ...props.info,
      [name]: val
    });
  }
}

BaseObjectEditor.propTypes = {
  ...Editor.propTypes,
  info: PropTypes.object,
  level: PropTypes.number,
  onInfo: PropTypes.func,
  properties: PropTypes.object.isRequired,
  required: PropTypes.array,
  value: PropTypes.object
};

BaseObjectEditor.defaultProps = {
  ...Editor.defaultProps,
  info: {},
  level: 1,
  onInfo: () => {},
  required: [],
  value: {}
};

class TopLevelObjectEditor extends BaseObjectEditor {
  render() {
    return (
      <div>
        {this.editors}
      </div>
    );
  }
}

class FieldsetObjectEditor extends BaseObjectEditor {
  constructor(props, ...args) {
    super(props, ...args);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: props.open
    };
  }

  get editors() {
    return (
      <div
        className={classNames('collapse', {in: this.state.open})}
      >
        {super.editors}
      </div>
    );
  }

  toggle() {
    this.setState({
      ...this.state,
      open: !this.state.open
    });
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

  render() {
    return (
      <fieldset>
        {this.label}
        {this.editors}
      </fieldset>
    );
  }
}

FieldsetObjectEditor.propTypes = {
  ...BaseObjectEditor.propTypes,
  open: PropTypes.bool
};

FieldsetObjectEditor.defaultProps = {
  ...BaseObjectEditor.defaultProps,
  open: true
};

class PanelObjectEditor extends BaseObjectEditor {
  get label() {
    return (
      <div className='panel-heading'>
        {this.title}
      </div>
    );
  }

  get editors() {
    return (
      <div className='panel-body'>
        {super.editors}
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

export default class ObjectEditor extends BaseObjectEditor {
  render() {
    const {level} = this.props;
    const Behaviour = (() => {
      switch (level) {
        case 1: return TopLevelObjectEditor;
        case 2: return FieldsetObjectEditor;
        default: return PanelObjectEditor;
      }
    })();
    return <Behaviour {...this.props}/>;
  }
}
