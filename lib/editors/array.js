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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var BaseArrayEditor = (function (_Editor) {
  _inherits(BaseArrayEditor, _Editor);

  function BaseArrayEditor() {
    _classCallCheck(this, BaseArrayEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(BaseArrayEditor.prototype), 'constructor', this).apply(this, args);
    this.addEditor = this.addEditor.bind(this);
  }

  _createClass(BaseArrayEditor, [{
    key: 'addEditor',
    value: function addEditor() {
      this.props.onChange([].concat(_toConsumableArray(this.props.value || []), [undefined]));
    }
  }, {
    key: 'removeButton',
    value: function removeButton(key) {
      return _react2['default'].createElement(
        'button',
        {
          className: 'close',
          onClick: this.createEditorRemover(key),
          type: 'button'
        },
        _react2['default'].createElement('i', { className: 'glyphicon glyphicon-remove' })
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
        noTitle: true,
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
    key: 'columnClass',
    get: function get() {
      var size = 12 / this.props.columns;
      return 'col-sm-' + size;
    }
  }, {
    key: 'editors',
    get: function get() {
      var _this = this;

      var _props = this.props;
      var columns = _props.columns;
      var value = _props.value;

      var items = (value || []).map(function (val, key) {
        return _react2['default'].createElement(
          'div',
          { className: 'panel-body' },
          _this.removeButton(key),
          _this.editor(key, val)
        );
      });

      if (!items.length) {
        items.push(_react2['default'].createElement(
          'div',
          { className: 'panel-body' },
          'No ' + this.title
        ));
      }

      var rows = [];
      for (var i = 0, j = items.length; i < j; i += columns) {
        rows.push(_react2['default'].createElement(
          'div',
          {
            className: 'row',
            key: i
          },
          items.slice(i, i + columns).map(function (item, column) {
            return _react2['default'].createElement(
              'div',
              {
                className: _this.columnClass,
                key: column + '-column'
              },
              item
            );
          })
        ));
      }

      return rows.concat([_react2['default'].createElement(
        'div',
        {
          className: 'panel-footer',
          key: 'footer'
        },
        this.addButton
      )]);
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

  return BaseArrayEditor;
})(_Editor3['default']);

BaseArrayEditor.propTypes = _extends({}, _Editor3['default'].propTypes, {
  columns: _react.PropTypes.number,
  info: _react.PropTypes.array,
  items: _react.PropTypes.object.isRequired,
  uniqueItems: _react.PropTypes.bool,
  value: _react.PropTypes.array
});

BaseArrayEditor.defaultProps = _extends({}, _Editor3['default'].defaultProps, {
  columns: 1,
  info: [],
  uniqueItems: false,
  value: []
});

var FieldsetArrayEditor = (function (_BaseArrayEditor) {
  _inherits(FieldsetArrayEditor, _BaseArrayEditor);

  function FieldsetArrayEditor(props) {
    var _get2;

    _classCallCheck(this, FieldsetArrayEditor);

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    (_get2 = _get(Object.getPrototypeOf(FieldsetArrayEditor.prototype), 'constructor', this)).call.apply(_get2, [this, props].concat(args));
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: props.open
    };
  }

  _createClass(FieldsetArrayEditor, [{
    key: 'toggle',
    value: function toggle() {
      this.setState(_extends({}, this.state, {
        open: !this.state.open
      }));
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
      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])('collapse panel panel-default', {
            'in': this.state.open
          }) },
        _get(Object.getPrototypeOf(FieldsetArrayEditor.prototype), 'editors', this)
      );
    }
  }, {
    key: 'label',
    get: function get() {
      return _react2['default'].createElement(
        'legend',
        { onClick: this.toggle },
        _react2['default'].createElement('span', {
          className: 'caret',
          style: { marginRight: '10px' }
        }),
        this.title
      );
    }
  }]);

  return FieldsetArrayEditor;
})(BaseArrayEditor);

var PanelArrayEditor = (function (_BaseArrayEditor2) {
  _inherits(PanelArrayEditor, _BaseArrayEditor2);

  function PanelArrayEditor() {
    _classCallCheck(this, PanelArrayEditor);

    _get(Object.getPrototypeOf(PanelArrayEditor.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PanelArrayEditor, [{
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
    key: 'label',
    get: function get() {
      return _react2['default'].createElement(
        'div',
        { className: 'panel-heading' },
        this.title
      );
    }
  }]);

  return PanelArrayEditor;
})(BaseArrayEditor);

var ArrayEditor = (function (_BaseArrayEditor3) {
  _inherits(ArrayEditor, _BaseArrayEditor3);

  function ArrayEditor() {
    _classCallCheck(this, ArrayEditor);

    _get(Object.getPrototypeOf(ArrayEditor.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ArrayEditor, [{
    key: 'render',
    value: function render() {
      var Behaviour = this.props.level === 2 ? FieldsetArrayEditor : PanelArrayEditor;
      return _react2['default'].createElement(Behaviour, this.props);
    }
  }]);

  return ArrayEditor;
})(BaseArrayEditor);

exports['default'] = ArrayEditor;
module.exports = exports['default'];