"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Nav = _interopRequireDefault(require("./Nav.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
  install: function install(Vue) {
    // 全局注册组件
    Vue.component('Nav', _Nav["default"]);
  }
};
exports["default"] = _default;