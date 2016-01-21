import React, {Component, PropTypes} from 'react';
import EditorFactory from './EditorFactory';
import {equals} from 'ramda';

export default class DimSum extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = props.value || {};
  }

  componentWillReceiveProps(props) {
    this.setState(props.value || {});
  }

  render() {
    return (
      <EditorFactory
        onChange={state => this.setState(state)}
        value={this.state}
        {...this.props}
      />
    );
  }
}

DimSum.propTypes = {
  value: PropTypes.object
};
