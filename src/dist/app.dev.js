"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createApp() {
  var router = (0, _router["default"])([]);
  var store = (0, _store.createStore)();
  var app = new _vue["default"]({
    router: router,
    store: store,
    render: function render(h) {
      return h(_App["default"]);
    }
  });
  return {
    app: app,
    router: router,
    store: store
  };
}