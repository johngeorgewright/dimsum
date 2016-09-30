'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EditorFactory = require('../EditorFactory');

var _EditorFactory2 = _interopRequireDefault(_EditorFactory);

var _Editor2 = require('../Editor');

var _Editor3 = _interopRequireDefault(_Editor2);

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
      this.props.onChange([].concat(_toConsumableArray(this.props.value), [undefined]));
    }
  }, {
    key: 'removeButton',
    value: function removeButton(key) {
      return _react2['default'].createElement(
        'button',
        {
          className: 'btn',
          onClick: this.createEditorRemover(key),
          type: 'button'
        },
        _react2['default'].createElement('i', { className: 'glyphicon glyphicon-minus' })
      );
    }
  }, {
    key: 'createEditorRemover',
    value: function createEditorRemover(key) {
      var props = this.props;

      return function () {
        return props.onChange([].concat(_toConsumableArray(props.value.slice(0, key)), _toConsumableArray(props.value.slice(key + 1))));
      };
    }
  }, {
    key: 'editorName',
    value: function editorName(key) {
      return '' + (key + 1);
    }
  }, {
    key: 'editor',
    value: function editor(key, val) {
      return _react2['default'].createElement(_EditorFactory2['default'], _extends({
        info: this.props.info[key],
        level: this.props.level + 1,
        name: this.editorName(key),
        title: '',
        onChange: this.createEditorUpdater(key),
        onInfo: this.createInfoUpdater(key),
        theme: this.props.theme,
        value: val
      }, this.props.items));
    }
  }, {
    key: 'createEditorUpdater',
    value: function createEditorUpdater(key) {
      var props = this.props;

      return function (val) {
        return props.onChange([].concat(_toConsumableArray(props.value.slice(0, key)), [val], _toConsumableArray(props.value.slice(key + 1))));
      };
    }
  }, {
    key: 'createInfoUpdater',
    value: function createInfoUpdater(key) {
      var props = this.props;

      return function (val) {
        return props.onInfo([].concat(_toConsumableArray(props.info.slice(0, key)), [val], _toConsumableArray(props.info.slice(key + 1))));
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'panel panel-default' },
        this.label,
        this.editors
      );
    }
  }, {
    key: 'editors',
    get: function get() {
      var _this = this;

      var value = this.props.value;

      var isLast = function isLast(i) {
        return i === _this.props.value.length - 1;
      };

      var result = [];

      value.forEach(function (val, key) {
        result.push(_react2['default'].createElement(
          'div',
          {
            className: 'panel-body',
            key: key + '-editor'
          },
          _this.editor(key, val)
        ));
        result.push(_react2['default'].createElement(
          'div',
          {
            className: 'panel-footer',
            key: key + '-footer'
          },
          isLast(key) ? _react2['default'].createElement(
            'div',
            { className: 'btn-group' },
            _this.removeButton(key),
            _this.addButton
          ) : _this.removeButton(key)
        ));
      });

      if (!result.length) {
        result.push(_react2['default'].createElement(
          'div',
          {
            className: 'panel-body',
            key: 'body'
          },
          'No ' + this.title
        ));
        result.push(_react2['default'].createElement(
          'div',
          {
            className: 'panel-footer',
            key: 'footer'
          },
          this.addButton
        ));
      }

      return result;
    }
  }, {
    key: 'label',
    get: function get() {
      return _react2['default'].createElement(
        'div',
        { className: 'panel-heading' },
        this.title
      );
    }
  }, {
    key: 'addButton',
    get: function get() {
      return _react2['default'].createElement(
        'button',
        {
          className: 'btn',
          onClick: this.addEditor,
          type: 'button'
        },
        _react2['default'].createElement('i', { className: 'glyphicon glyphicon-plus' })
      );
    }
  }]);

  return ArrayEditor;
})(_Editor3['default']);

exports['default'] = ArrayEditor;

ArrayEditor.propTypes = _extends({}, _Editor3['default'].propTypes, {
  info: _react.PropTypes.array,
  items: _react.PropTypes.object.isRequired,
  uniqueItems: _react.PropTypes.bool,
  value: _react.PropTypes.array
});

ArrayEditor.defaultProps = _extends({}, _Editor3['default'].defaultProps, {
  info: [],
  uniqueItems: false,
  value: []
});
module.exports = exports['default'];