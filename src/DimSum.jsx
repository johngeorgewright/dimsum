import React, {Component, PropTypes} from 'react';
import EditorFactory from './EditorFactory.jsx';
import {assoc, omit, merge} from 'ramda';
import Ajv from 'ajv';

const validator = Ajv();
const schemaFromProps = omit(['onChange', 'value']);
const setErrors = assoc('errors');

export default class DimSum extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.onChange = this.onChange.bind(this);
    this.state = {};
  }

  get schema() {
    return schemaFromProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState(merge(this.state, {
      errors: props.errors,
      value: props.value
    }));
  }

  validate() {
    let validate = validator.compile(this.schema);
    let errors = !validate(this.props.value) ? validate.errors : [];
    this.props.onError(errors);
    this.setState(setErrors(errors, this.state));
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
        value={this.props.value}
        {...this.props}
      />
    );
  }
}

DimSum.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func,
  value: PropTypes.object
};

DimSum.defaultProps = {
  onChange: () => {},
  onError: () => {},
  value: {}
};
