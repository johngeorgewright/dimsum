import React, {Component, PropTypes} from 'react';
import * as editors from './editors';

export default class EditorFactory extends Component {
  get editorProps() {
    let props = Object.assign({}, this.props);
    delete props.type;
    return props;
  }

  render() {
    let Editor = editors[this.props.type];
    return Editor
      ? <Editor {...this.editorProps}/>
      : <div/>;
  }
}

EditorFactory.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
