import React, {PropTypes, Stylesheet} from 'react';
import Editor from '../../Editor';
import Select from 'react-select';

let styles = {
  wrapper: {
    position: 'relatvie'
  },
  control: {
    backgroundColor: '',
    border: '',
    borderColor: '',
    borderRadius: '',
    boxSizing: 'border-box',
    color: '',
    cursor: 'default',
    display: 'table',
    height: '',
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  menuContainer: {
    borderBottomRadius: '',
    border: '1px solid ',
    borderTopColor: '',
    boxSizing: 'border-box',
    marginTop: '-1px',
    position: 'absolute',
    top: '100%',
    width: '100%',
    zIndex: '',
    overflowScrolling: 'touch'
  },
  menu: {
    maxHeight: '',
    overflow: 'auto'
  }
};

export default class EnumEditor extends Editor {
  get input() {
    let {props} = this;
    return (
      <Select
        id={props.name}
        multi={props.multi}
        name={props.name}
        onChange={props.onChange}
        options={this.options}
        value={this.value}
      >
        {this.options}
      </Select>
    );
  }

  get options() {
    return this.props.enum.map(option => ({
      label: option,
      value: option
    }));
  }

  get value() {
    let {props} = this;
    return props.value || (props.required && props.enum[0]);
  }

  render() {
    return (
      <div>
        {this.label}
        {this.input}
      </div>
    );
  }
}

EnumEditor.propTypes = {
  defaultValue: PropTypes.any,
  enum: PropTypes.array,
  multi: PropTypes.bool
};

EnumEditor.defaultProps = {
  enum: [],
  multi: false
};
