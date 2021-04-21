"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _method = _interopRequireDefault(require("./method.vue"));

var _params = _interopRequireDefault(require("./params.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  install: function install(Vue) {
    Vue.components('method', _method["default"]);
    Vue.components('params', _params["default"]);
  }
};
exports["default"] = _default;