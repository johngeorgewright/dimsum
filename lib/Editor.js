'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PropTypes = require('./PropTypes');

var DimSumPropTypes = _interopRequireWildcard(_PropTypes);

var Editor = (function (_Component) {
  _inherits(Editor, _Component);

  function Editor() {
    _classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).apply(this, args);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  _createClass(Editor, [{
    key: 'handleFocus',
    value: function handleFocus() {
      var props = this.props;

      var info = (props.info.focus || []).concat(this.context.user.name);
      props.onInfo(_extends({}, props.info, {
        focus: [].concat(_toConsumableArray(new Set(info)))
      }));
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      var props = this.props;

      props.onInfo(_extends({}, props.info, {
        focus: this.usersThatAreFocused
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])('form-group', {
            'has-warning': this.usersThatAreFocused.length
          }) },
        this.label,
        this.input,
        this.collaborators
      );
    }
  }, {
    key: 'usersThatAreFocused',
    get: function get() {
      var focus = this.props.info.focus || [];
      var index = focus.indexOf(this.context.user.name);
      return [].concat(_toConsumableArray(focus.slice(0, index)), _toConsumableArray(focus.slice(index + 1)));
    }
  }, {
    key: 'collaborators',
    get: function get() {
      return this.usersThatAreFocused.length ? _react2['default'].createElement(
        'p',
        { className: 'help-block' },
        this.usersThatAreFocused.map(function (user, key) {
          return _react2['default'].createElement(
            'span',
            {
              className: 'label label-warning',
              key: key
            },
            user
          );
        })
      ) : _react2['default'].createElement('span', null);
    }
  }, {
    key: 'input',
    get: function get() {
      return '';
    }
  }, {
    key: 'label',
    get: function get() {
      return _react2['default'].createElement(
        'label',
        { htmlFor: this.props.name },
        this.title
      );
    }
  }, {
    key: 'title',
    get: function get() {
      return this.props.title || this.props.name;
    }
  }]);

  return Editor;
})(_react.Component);

exports['default'] = Editor;

Editor.propTypes = {
  info: _react.PropTypes.shape({
    focus: _react.PropTypes.array
  }),
  isRequired: _react.PropTypes.bool,
  name: function name(props, propName) {
    if (!/^[a-z0-9_\-]+$/i.test(props[propName])) {
      return new Error('Invalid name "' + props[propName] + '"');
    }
  },
  onChange: _react.PropTypes.func.isRequired,
  onInfo: _react.PropTypes.func,
  title: _react.PropTypes.string
};

Editor.defaultProps = {
  info: {
    focus: []
  },
  isRequired: false,
  onInfo: function onInfo() {}
};

Editor.contextTypes = {
  user: DimSumPropTypes.User.isRequired
};
module.exports = exports['default'];