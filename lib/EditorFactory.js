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

var EditorFactory = (function (_Component) {
  _inherits(EditorFactory, _Component);

  function EditorFactory() {
    _classCallCheck(this, EditorFactory);

    _get(Object.getPrototypeOf(EditorFactory.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(EditorFactory, [{
    key: 'render',
    value: function render() {
      var Editor = this.Editor;
      return Editor ? _react2['default'].createElement(Editor, this.props) : _react2['default'].createElement('div', null);
    }
  }, {
    key: 'Editor',
    get: function get() {
      var props = this.props;

      var Editor = props.theme[props.type];
      return props['enum'] && Editor && Editor.enumerable ? props.theme.enumerable : Editor;
    }
  }]);

  return EditorFactory;
})(_react.Component);

exports['default'] = EditorFactory;

EditorFactory.propTypes = {
  'enum': _react.PropTypes.array,
  name: _react.PropTypes.string.isRequired,
  theme: _react.PropTypes.object.isRequired,
  type: _react.PropTypes.string.isRequired
};
module.exports = exports['default'];