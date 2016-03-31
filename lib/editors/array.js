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

var editorName = (0, _ramda.pipe)(_ramda.inc, _ramda.toString);
var addItem = (0, _ramda.append)(undefined);
var removeAtIndex = (0, _ramda.remove)(_ramda.__, 1);

var ArrayEditor = (function (_Editor) {
  _inherits(ArrayEditor, _Editor);

  function ArrayEditor() {
    _classCallCheck(this, ArrayEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(ArrayEditor.prototype), 'constructor', this).apply(this, args);
    this.addEditor = this.addEditor.bind(this);
  }

  _createClass(ArrayEditor, [{
    key: 'addEditor',
    value: function addEditor() {
      this.props.onChange(addItem(this.props.value));
    }
  }, {
    key: 'removeButton',
    value: function removeButton(key) {
      return _react2['default'].createElement(
        'button',
        {
          onClick: this.createEditorRemover(key),
          type: 'button'
        },
        'Remove'
      );
    }
  }, {
    key: 'createEditorRemover',
    value: function createEditorRemover(key) {
      var props = this.props;

      return function () {
        return props.onChange(removeAtIndex(key, props.value));
      };
    }
  }, {
    key: 'editor',
    value: function editor(key, val) {
      return _react2['default'].createElement(_EditorFactory2['default'], _extends({
        name: editorName(key),
        onChange: this.createEditorUpdater(key),
        theme: this.props.theme,
        value: val
      }, this.props.items));
    }
  }, {
    key: 'createEditorUpdater',
    value: function createEditorUpdater(key) {
      var props = this.props;

      return function (val) {
        return props.onChange((0, _ramda.update)(key, val, props.value));
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'fieldset',
        null,
        this.label,
        this.editors,
        this.addButton
      );
    }
  }, {
    key: 'editors',
    get: function get() {
      var _this = this;

      return this.props.value.map(function (val, key) {
        return _react2['default'].createElement(
          'div',
          { key: key },
          _this.editor(key, val),
          _this.removeButton(key)
        );
      });
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
  }, {
    key: 'addButton',
    get: function get() {
      return _react2['default'].createElement(
        'button',
        {
          onClick: this.addEditor,
          type: 'button'
        },
        'Add ' + this.title
      );
    }
  }]);

  return ArrayEditor;
})(_Editor3['default']);

exports['default'] = ArrayEditor;

ArrayEditor.propTypes = {
  items: _react.PropTypes.object.isRequired,
  uniqueItems: _react.PropTypes.bool,
  value: _react.PropTypes.array
};

ArrayEditor.defaultProps = {
  uniqueItems: false,
  value: []
};
module.exports = exports['default'];