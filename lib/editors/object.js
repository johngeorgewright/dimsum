'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var BaseObjectEditor = (function (_Editor) {
  _inherits(BaseObjectEditor, _Editor);

  function BaseObjectEditor() {
    _classCallCheck(this, BaseObjectEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(BaseObjectEditor.prototype), 'constructor', this).apply(this, args);
    this.editor = this.editor.bind(this);
  }

  _createClass(BaseObjectEditor, [{
    key: 'isRequired',
    value: function isRequired(name) {
      return this.props.required.indexOf(name) !== -1;
    }
  }, {
    key: 'editor',
    value: function editor(name, key) {
      var props = this.props;
      var properties = props.properties;
      var value = props.value;

      return _react2['default'].createElement(_EditorFactory2['default'], _extends({}, properties[name], {
        info: props.info[name],
        isRequired: this.isRequired(name),
        key: key,
        level: props.level + 1,
        name: name,
        onChange: this.createUpdater(name),
        onInfo: this.createInfoUpdater(name),
        theme: props.theme,
        value: value && value[name]
      }));
    }
  }, {
    key: 'createUpdater',
    value: function createUpdater(name) {
      var props = this.props;

      return function (val) {
        return props.onChange(_extends({}, props.value, _defineProperty({}, name, val)), _defineProperty({}, name, val));
      };
    }
  }, {
    key: 'createInfoUpdater',
    value: function createInfoUpdater(name) {
      var props = this.props;

      return function () {
        var val = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        return props.onInfo(_extends({}, props.info, _defineProperty({}, name, val)));
      };
    }
  }, {
    key: 'editors',
    get: function get() {
      return Object.keys(this.props.properties).map(this.editor);
    }
  }]);

  return BaseObjectEditor;
})(_Editor3['default']);

BaseObjectEditor.propTypes = _extends({}, _Editor3['default'].propTypes, {
  info: _react.PropTypes.object,
  level: _react.PropTypes.number,
  onInfo: _react.PropTypes.func,
  properties: _react.PropTypes.object.isRequired,
  required: _react.PropTypes.array,
  value: _react.PropTypes.object
});

BaseObjectEditor.defaultProps = _extends({}, _Editor3['default'].defaultProps, {
  info: {},
  level: 1,
  onInfo: function onInfo() {},
  required: [],
  value: {}
});

var TopLevelObjectEditor = (function (_BaseObjectEditor) {
  _inherits(TopLevelObjectEditor, _BaseObjectEditor);

  function TopLevelObjectEditor() {
    _classCallCheck(this, TopLevelObjectEditor);

    _get(Object.getPrototypeOf(TopLevelObjectEditor.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TopLevelObjectEditor, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        this.editors
      );
    }
  }]);

  return TopLevelObjectEditor;
})(BaseObjectEditor);

var FieldsetObjectEditor = (function (_BaseObjectEditor2) {
  _inherits(FieldsetObjectEditor, _BaseObjectEditor2);

  function FieldsetObjectEditor(props) {
    var _get2;

    _classCallCheck(this, FieldsetObjectEditor);

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    (_get2 = _get(Object.getPrototypeOf(FieldsetObjectEditor.prototype), 'constructor', this)).call.apply(_get2, [this, props].concat(args));
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: props.open
    };
  }

  _createClass(FieldsetObjectEditor, [{
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
        {
          className: (0, _classnames2['default'])('collapse', { 'in': this.state.open })
        },
        _get(Object.getPrototypeOf(FieldsetObjectEditor.prototype), 'editors', this)
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

  return FieldsetObjectEditor;
})(BaseObjectEditor);

FieldsetObjectEditor.propTypes = _extends({}, BaseObjectEditor.propTypes, {
  open: _react.PropTypes.bool
});

FieldsetObjectEditor.defaultProps = _extends({}, BaseObjectEditor.defaultProps, {
  open: false
});

var PanelObjectEditor = (function (_BaseObjectEditor3) {
  _inherits(PanelObjectEditor, _BaseObjectEditor3);

  function PanelObjectEditor() {
    _classCallCheck(this, PanelObjectEditor);

    _get(Object.getPrototypeOf(PanelObjectEditor.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PanelObjectEditor, [{
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
      return this.props.noTitle ? _react2['default'].createElement('span', null) : _react2['default'].createElement(
        'div',
        { className: 'panel-heading' },
        this.title
      );
    }
  }, {
    key: 'editors',
    get: function get() {
      return _react2['default'].createElement(
        'div',
        { className: 'panel-body' },
        _get(Object.getPrototypeOf(PanelObjectEditor.prototype), 'editors', this)
      );
    }
  }]);

  return PanelObjectEditor;
})(BaseObjectEditor);

var ObjectEditor = (function (_BaseObjectEditor4) {
  _inherits(ObjectEditor, _BaseObjectEditor4);

  function ObjectEditor() {
    _classCallCheck(this, ObjectEditor);

    _get(Object.getPrototypeOf(ObjectEditor.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ObjectEditor, [{
    key: 'render',
    value: function render() {
      var level = this.props.level;

      var Behaviour = (function () {
        switch (level) {
          case 1:
            return TopLevelObjectEditor;
          case 2:
            return FieldsetObjectEditor;
          default:
            return PanelObjectEditor;
        }
      })();
      return _react2['default'].createElement(Behaviour, this.props);
    }
  }]);

  return ObjectEditor;
})(BaseObjectEditor);

exports['default'] = ObjectEditor;
module.exports = exports['default'];