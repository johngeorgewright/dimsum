'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Editor2 = require('../Editor');

var _Editor3 = _interopRequireDefault(_Editor2);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _ramda = require('ramda');

var isRequired = (0, _ramda.prop)('isRequired');
var whenRequired = (0, _ramda.both)(isRequired);
var firstEnumValue = (0, _ramda.pipe)((0, _ramda.prop)('enum'), _ramda.head);
var getValue = (0, _ramda.prop)('value');
var getValues = (0, _ramda.map)(getValue);

var EnumEditor = (function (_Editor) {
  _inherits(EnumEditor, _Editor);

  function EnumEditor() {
    _classCallCheck(this, EnumEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(EnumEditor.prototype), 'constructor', this).apply(this, args);
    this.onChange = this.onChange.bind(this);
  }

  _createClass(EnumEditor, [{
    key: 'onChange',
    value: function onChange(selected) {
      var props = this.props;

      var value = undefined;
      if (selected) {
        value = props.multi ? getValues(selected) : selected.value;
      }
      props.onChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        this.label,
        this.input
      );
    }
  }, {
    key: 'input',
    get: function get() {
      var props = this.props;

      return _react2['default'].createElement(
        _reactSelect2['default'],
        {
          id: props.name,
          multi: props.multi,
          name: props.name,
          onChange: this.onChange,
          options: this.options,
          value: this.value
        },
        this.options
      );
    }
  }, {
    key: 'options',
    get: function get() {
      return this.props['enum'].map(function (option) {
        return {
          label: option,
          value: option
        };
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return (0, _ramda.either)(getValue, whenRequired(firstEnumValue))(this.props);
    }
  }]);

  return EnumEditor;
})(_Editor3['default']);

exports['default'] = EnumEditor;

EnumEditor.propTypes = {
  'enum': _react.PropTypes.array,
  type: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  value: function value(props, propName, componentName) {
    if (typeof props[propName] === 'undefined') {
      return;
    }
    var type = _react.PropTypes[props.type];
    if (!type) {
      return new Error('Cannot use an enum of type "' + type + '"');
    }
    return type(props, propName, componentName);
  }
};

EnumEditor.defaultProps = {
  'enum': [],
  multi: false
};
module.exports = exports['default'];