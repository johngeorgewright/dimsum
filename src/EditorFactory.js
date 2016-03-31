import React, {Component, PropTypes} from 'react';

export default class EditorFactory extends Component {
  get Editor() {
    let {props} = this;
    let Editor = props.theme[props.type];
    return props.enum && Editor && Editor.enumerable
      ? props.theme.enumerable
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
  theme: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};
