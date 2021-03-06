'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Editor2 = require('../Editor');

var _Editor3 = _interopRequireDefault(_Editor2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var BooleanEditor = (function (_Editor) {
  _inherits(BooleanEditor, _Editor);

  function BooleanEditor() {
    _classCallCheck(this, BooleanEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(BooleanEditor.prototype), 'constructor', this).apply(this, args);
    this.handleChange = this.handleChange.bind(this);
  }

  _createClass(BooleanEditor, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.onChange(event.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])('checkbox', {
            'has-warning': this.usersThatAreFocused.length
          }) },
        _react2['default'].createElement(
          'label',
          null,
          this.input,
          this.label
        ),
        this.collaborators
      );
    }
  }, {
    key: 'label',
    get: function get() {
      return this.title;
    }
  }, {
    key: 'input',
    get: function get() {
      var name = this.props.name;

      return _react2['default'].createElement('input', {
        checked: this.props.value,
        id: name,
        name: name,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        type: 'checkbox'
      });
    }
  }]);

  return BooleanEditor;
})(_Editor3['default']);

exports['default'] = BooleanEditor;

BooleanEditor.propTypes = _extends({}, _Editor3['default'].propTypes, {
  value: _react.PropTypes.bool
});
module.exports = exports['default'];