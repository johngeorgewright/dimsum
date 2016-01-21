import React, {Component, PropTypes} from 'react';
import StringEditor from './editors/string';
import ObjectEditor from './editors/object';

export default class EditorFactory extends Component {
  get editor() {
    switch (this.props.type) {
    case 'string':
      return StringEditor;
    case 'object':
      return ObjectEditor;
    }
  }

  get editorProps() {
    let props = Object.assign({}, this.props);
    delete props.type;
    return props;
  }

  render() {
    let Editor = this.editor;
    return Editor
      ? <Editor {...this.editorProps}/>
      : <div/>;
  }
}

EditorFactory.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
