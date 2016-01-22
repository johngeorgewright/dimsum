import React, {Component, PropTypes} from 'react';
import EditorFactory from './EditorFactory';
import {equals} from 'ramda';

export default class DimSum extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    if (!props.onChange) {
      this.state = props.value || {};
    }
  }

  componentWillReceiveProps(props) {
    if (!props.onChange) {
      this.setState(props.value || {});
    }
  }

  onChange(value) {
    let {onChange} = this.props;
    if (onChange) {
      onChange(value);
    } else {
      this.setState(value);
    }
  }

  render() {
    return (
      <EditorFactory
        onChange={this.onChange.bind(this)}
        value={this.state || this.props.value}
        {...this.props}
      />
    );
  }
}

DimSum.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object
};
