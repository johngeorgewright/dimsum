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

var _EditorFactory = require('../EditorFactory');

var _EditorFactory2 = _interopRequireDefault(_EditorFactory);

var _Editor2 = require('../Editor');

var _Editor3 = _interopRequireDefault(_Editor2);

var _ramda = require('ramda');

var ObjectEditor = (function (_Editor) {
  _inherits(ObjectEditor, _Editor);

  function ObjectEditor() {
    _classCallCheck(this, ObjectEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(ObjectEditor.prototype), 'constructor', this).apply(this, args);
    this.editor = this.editor.bind(this);
  }

  _createClass(ObjectEditor, [{
    key: 'isRequired',
    value: function isRequired(name) {
      return this.props.required.indexOf(name) !== -1;
    }
  }, {
    key: 'editor',
    value: function editor(name, key) {
      var _props = this.props;
      var properties = _props.properties;
      var value = _props.value;

      return _react2['default'].createElement(_EditorFactory2['default'], _extends({
        isRequired: this.isRequired(name),
        key: key,
        name: name,
        onChange: this.createUpdater(name),
        theme: this.props.theme,
        value: value && value[name]
      }, properties[name]));
    }
  }, {
    key: 'createUpdater',
    value: function createUpdater(name) {
      var props = this.props;

      return function (val) {
        return props.onChange((0, _ramda.assoc)(name, val, props.value));
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'fieldset',
        null,
        this.label,
        this.editors
      );
    }
  }, {
    key: 'editors',
    get: function get() {
      return (0, _ramda.keys)(this.props.properties).map(this.editor);
    }
  }, {
    key: 'label',
    get: function get() {
      return _react2['default'].createElement(
        'legend',
        null,
        this.title
      );
    }
  }]);

  return ObjectEditor;
})(_Editor3['default']);

exports['default'] = ObjectEditor;

ObjectEditor.propTypes = {
  properties: _react.PropTypes.object.isRequired,
  required: _react.PropTypes.array,
  value: _react.PropTypes.object
};

ObjectEditor.defaultProps = {
  required: [],
  value: {}
};
module.exports = exports['default'];