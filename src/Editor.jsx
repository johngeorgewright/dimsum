import React, {Component, PropTypes} from 'react';

export default class Editor extends Component {
  get label() {
    return (
      <label htmlFor={this.props.name}>
        {this.title}
      </label>
    );
  }

  get title() {
    return this.props.title || this.props.name;
  }
}

Editor.propTypes = {
  isRequired: PropTypes.bool,
  name: (props, propsName, componentName) => {
    if (!/^[a-z0-9_]+/i) {
      return new Error('Invalid name');
    }
  },
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string
};

Editor.defaultValues = {
  isRequired: false
};
