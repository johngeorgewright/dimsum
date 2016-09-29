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

var StringEditor = (function (_Editor) {
  _inherits(StringEditor, _Editor);

  function StringEditor(props) {
    var _get2;

    _classCallCheck(this, StringEditor);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_get2 = _get(Object.getPrototypeOf(StringEditor.prototype), 'constructor', this)).call.apply(_get2, [this, props].concat(args));
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  _createClass(StringEditor, [{
    key: 'handleBlur',
    value: function handleBlur() {
      this.props.onInfo(_extends({}, this.props.info, {
        focus: false
      }));
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.onChange(event.target.value);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.props.onInfo(_extends({}, this.props.info, {
        focus: true
      }));
    }
  }, {
    key: 'input',
    get: function get() {
      var props = this.props;

      return _react2['default'].createElement('input', {
        id: props.name,
        name: props.name,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        required: props.isRequired,
        type: 'text',
        value: props.value
      });
    }
  }]);

  return StringEditor;
})(_Editor3['default']);

exports['default'] = StringEditor;

StringEditor.propTypes = {
  info: _react.PropTypes.object,
  value: _react.PropTypes.string
};

StringEditor.defaultProps = {
  info: {},
  value: ''
};

StringEditor.enumerable = true;
module.exports = exports['default'];