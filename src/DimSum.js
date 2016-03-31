import React, {Component, PropTypes} from 'react';
import * as defaultTheme from './editors';
import EditorFactory from './EditorFactory';
import {assoc, omit, merge} from 'ramda';
import tv4 from 'tv4';

const schemaFromProps = omit(['onChange', 'value']);
const setError = assoc('error');

export default class DimSum extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.onChange = this.onChange.bind(this);
    this.state = {};
  }

  get schema() {
    return schemaFromProps(this.props);
  }

  componentWillReceiveProps({errors, value}) {
    this.setState(merge(this.state, {errors, value}));
  }

  validate() {
    let error = tv4.validate(this.props.value, this.schema) ? null : tv4.error;
    this.props.onError(error);
    this.setState(setError(error, this.state));
  }

  onChange(value) {
    this.props.onChange(value);
    this.setState(value);
  }

  render() {
    return (
      <EditorFactory
        errors={this.state.errors}
        onChange={this.onChange}
        value={this.state.value}
        {...this.props}
      />
    );
  }
}

DimSum.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func,
  theme: PropTypes.object,
  value: PropTypes.object
};

DimSum.defaultProps = {
  onChange: () => {},
  onError: () => {},
  theme: defaultTheme,
  value: {}
};