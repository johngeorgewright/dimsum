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
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  title: PropTypes.string
};

Editor.defaultValues = {
  required: false
};
