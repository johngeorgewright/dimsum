import React, {Component, PropTypes} from 'react';
import EditorFactory from '../EditorFactory';

export default class ObjectEditor extends Component {
  get editors() {
    let {properties} = this.props;
    return Object.keys(properties).map((name, key) => (
      <EditorFactory
        key={key}
        name={name}
        {...properties[name]}
      />
    ));
  }

  get title() {
    return this.props.title || this.props.name;
  }

  render() {
    return (
      <fieldset>
        <legend>
          {this.title}
        </legend>
        {this.editors}
      </fieldset>
    );
  }
}

ObjectEditor.propTypes = {
  name: PropTypes.string.isRequired,
  properties: PropTypes.object.isRequired,
  title: PropTypes.string
};
