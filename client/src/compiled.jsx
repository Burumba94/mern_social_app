"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _socket = _interopRequireDefault(require("socket.io-client"));
var _PageRender = _interopRequireDefault(require("./src/customRouter/PageRender"));
var _PrivateRouter = _interopRequireDefault(require("./src/customRouter/PrivateRouter"));
var _login = _interopRequireDefault(require("./src/pages/login"));
var _register = _interopRequireDefault(require("./src/pages/register"));
var _home = _interopRequireDefault(require("./src/pages/home"));
var _Alert = _interopRequireDefault(require("./src/components/alert/Alert"));
var _Header = _interopRequireDefault(require("./src/components/header/Header"));
var _StatusModal = _interopRequireDefault(require("./src/components/StatusModal"));
var _authAction = require("./src/redux/actions/authAction");
var _postAction = require("./src/redux/actions/postAction");
var _suggestionsAction = require("./src/redux/actions/suggestionsAction");
var _notifyAction = require("./src/redux/actions/notifyAction");
var _adminDashboard = _interopRequireDefault(require("./src/pages/adminDashboard"));
var _globalTypes = require("./src/redux/actions/globalTypes");
var _SocketClient = _interopRequireDefault(require("./src/SocketClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var App = function App() {
  var _useSelector = (0, _reactRedux.useSelector)(function (state) {
      return state;
    }),
    auth = _useSelector.auth,
    status = _useSelector.status,
    modal = _useSelector.modal,
    userType = _useSelector.userType;
  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    dispatch((0, _authAction.refreshToken)());
    var socket = (0, _socket["default"])();
    dispatch({
      type: _globalTypes.GLOBALTYPES.SOCKET,
      payload: socket
    });
    return function () {
      return socket.close();
    };
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    if (auth.token) {
      dispatch((0, _postAction.getPosts)(auth.token));
      dispatch((0, _suggestionsAction.getSuggestions)(auth.token));
      dispatch((0, _notifyAction.getNotifies)(auth.token));
    }
  }, [dispatch, auth.token]);
  (0, _react.useEffect)(function () {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {} else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react["default"].createElement(_Alert["default"], null), /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox",
    id: "theme"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "App ".concat((status || modal) && "mode")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "main"
  }, userType === "user" && auth.token && /*#__PURE__*/_react["default"].createElement(_Header["default"], null), status && /*#__PURE__*/_react["default"].createElement(_StatusModal["default"], null), auth.token && /*#__PURE__*/_react["default"].createElement(_SocketClient["default"], null), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: userType === "user" ? auth.token ? _home["default"] : _login["default"] : auth.token ? _adminDashboard["default"] : _login["default"]
  }), userType === "user" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/register",
    component: _register["default"]
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "wrap_page"
  }, /*#__PURE__*/_react["default"].createElement(_PrivateRouter["default"], {
    exact: true,
    path: "/:page",
    component: _PageRender["default"]
  }), /*#__PURE__*/_react["default"].createElement(_PrivateRouter["default"], {
    exact: true,
    path: "/:page/:id",
    component: _PageRender["default"]
  }))))));
};
var _default = exports["default"] = App;
