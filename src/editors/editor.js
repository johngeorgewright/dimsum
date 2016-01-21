import React, {Component, PropTypes} from 'react';

export default class Editor extends Component {
  get title() {
    return this.props.title || this.props.name;
  }
}

Editor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string
};
