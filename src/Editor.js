import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import * as DimSumPropTypes from './PropTypes';

export default class Editor extends Component {
  constructor(...args) {
    super(...args);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus() {
    const {props} = this;
    const info = (props.info.focus || []).concat(this.context.user.name);
    props.onInfo({
      ...props.info,
      focus: [ ...new Set(info) ]
    });
  }

  handleBlur() {
    const {props} = this;
    props.onInfo({
      ...props.info,
      focus: this.usersThatAreFocused
    });
  }

  get usersThatAreFocused() {
    const focus = this.props.info.focus || [];
    const index = focus.indexOf(this.context.user.name);
    return [
      ...focus.slice(0, index),
      ...focus.slice(index + 1)
    ];
  }

  get collaborators() {
    return this.usersThatAreFocused.length
      ? (
        <p className='help-block'>
          {this.usersThatAreFocused.map((user, key) => (
            <span
              className='label label-warning'
              key={key}
            >
              {user}
            </span>
          ))}
        </p>
      )
      : <span/>;
  }

  get input() {
    return '';
  }

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

  render() {
    return (
      <div className={classNames('form-group', {
          'has-warning': this.usersThatAreFocused.length
      })}>
        {this.label}
        {this.input}
        {this.collaborators}
      </div>
    );
  }
}

Editor.propTypes = {
  info: PropTypes.shape({
    focus: PropTypes.array
  }),
  isRequired: PropTypes.bool,
  name: (props, propName) => {
    if (!/^[a-z0-9_\-]+$/i.test(props[propName])) {
      return new Error(`Invalid name "${props[propName]}"`);
    }
  },
  onChange: PropTypes.func.isRequired,
  onInfo: PropTypes.func,
  title: PropTypes.string
};

Editor.defaultProps = {
  info: {
    focus: []
  },
  isRequired: false,
  onInfo: () => {}
};

Editor.contextTypes = {
  user: DimSumPropTypes.User.isRequired
};
