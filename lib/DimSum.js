'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _editors = require('./editors');

var defaultTheme = _interopRequireWildcard(_editors);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _EditorFactory = require('./EditorFactory');

var _EditorFactory2 = _interopRequireDefault(_EditorFactory);

var _PropTypes = require('./PropTypes');

var DimSumPropTypes = _interopRequireWildcard(_PropTypes);

var _tv4 = require('tv4');

var _tv42 = _interopRequireDefault(_tv4);

exports.defaultTheme = defaultTheme;
exports.Editor = _Editor2['default'];
exports.EditorFactory = _EditorFactory2['default'];
exports.PropTypes = DimSumPropTypes;

var DimSum = (function (_Component) {
  _inherits(DimSum, _Component);

  function DimSum(props) {
    var _get2;

    _classCallCheck(this, DimSum);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_get2 = _get(Object.getPrototypeOf(DimSum.prototype), 'constructor', this)).call.apply(_get2, [this, props].concat(args));
    this.onChange = this.onChange.bind(this);
  }

  _createClass(DimSum, [{
    key: 'onChange',

    // validate() {
    //   let error = tv4.validate(this.props.value, this.schema) ? null : tv4.error;
    //   this.props.onError(error);
    //   this.setState({error, ...this.state});
    // }

    value: function onChange(value, patch) {
      this.props.onChange(_extends({}, value), patch);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(_EditorFactory2['default'], _extends({}, this.props, {
        info: this.props.info,
        onChange: this.onChange,
        value: this.props.value
      }));
    }
  }, {
    key: 'schema',
    get: function get() {
      var schema = _extends({}, this.props);
      delete schema.onChange;
      delete schema.value;
      return schema;
    }
  }]);

  return DimSum;
})(_react.Component);

exports['default'] = DimSum;

DimSum.propTypes = {
  info: _react.PropTypes.object,
  name: _react.PropTypes.string.isRequired,
  onChange: _react.PropTypes.func,
  onError: _react.PropTypes.func,
  theme: _react.PropTypes.object,
  type: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.object
};

DimSum.defaultProps = {
  info: {},
  onChange: function onChange() {},
  onError: function onError() {},
  theme: defaultTheme,
  value: {}
};

DimSum.contextTypes = {
  user: DimSumPropTypes.User.isRequired
};