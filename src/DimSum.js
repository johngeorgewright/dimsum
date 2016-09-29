import React, {Component, PropTypes} from 'react';
import * as defaultTheme from './editors';
import Editor from './Editor';
import EditorFactory from './EditorFactory';
import * as DimSumPropTypes from './PropTypes';
import tv4 from 'tv4';

export {defaultTheme, Editor, EditorFactory, PropTypes};

export default class DimSum extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.onChange = this.onChange.bind(this);
  }

  get schema() {
    let schema = {...this.props};
    delete schema.onChange;
    delete schema.value;
    return schema;
  }

  // validate() {
  //   let error = tv4.validate(this.props.value, this.schema) ? null : tv4.error;
  //   this.props.onError(error);
  //   this.setState({error, ...this.state});
  // }

  onChange(value, patch) {
    this.props.onChange(Object.assign({}, value), patch);
  }

  render() {
    return (
      <EditorFactory
        {...this.props}
        info={this.props.info}
        onChange={this.onChange}
        value={this.props.value}
      />
    );
  }
}

DimSum.propTypes = {
  info: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  theme: PropTypes.object,
  type: PropTypes.string.isRequired,
  value: PropTypes.object
};

DimSum.defaultProps = {
  info: {},
  onChange: () => {},
  onError: () => {},
  theme: defaultTheme,
  value: {}
};

DimSum.contextTypes = {
  user: DimSumPropTypes.User.isRequired
};
