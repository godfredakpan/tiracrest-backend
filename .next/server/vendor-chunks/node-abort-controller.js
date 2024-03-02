/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/node-abort-controller";
exports.ids = ["vendor-chunks/node-abort-controller"];
exports.modules = {

/***/ "(ssr)/./node_modules/node-abort-controller/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/node-abort-controller/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { EventEmitter } = __webpack_require__(/*! events */ \"events\");\n\nclass AbortSignal {\n  constructor() {\n    this.eventEmitter = new EventEmitter();\n    this.onabort = null;\n    this.aborted = false;\n    this.reason = undefined;\n  }\n  toString() {\n    return \"[object AbortSignal]\";\n  }\n  get [Symbol.toStringTag]() {\n    return \"AbortSignal\";\n  }\n  removeEventListener(name, handler) {\n    this.eventEmitter.removeListener(name, handler);\n  }\n  addEventListener(name, handler) {\n    this.eventEmitter.on(name, handler);\n  }\n  dispatchEvent(type) {\n    const event = { type, target: this };\n    const handlerName = `on${type}`;\n\n    if (typeof this[handlerName] === \"function\") this[handlerName](event);\n\n    this.eventEmitter.emit(type, event);\n  }\n  throwIfAborted() {\n    if (this.aborted) {\n      throw this.reason;\n    }\n  }\n  static abort(reason) {\n    const controller = new AbortController();\n    controller.abort();\n    return controller.signal;\n  }\n  static timeout(time) {\n    const controller = new AbortController();\n    setTimeout(() => controller.abort(new Error(\"TimeoutError\")), time);\n    return controller.signal;\n  }\n}\nclass AbortController {\n  constructor() {\n    this.signal = new AbortSignal();\n  }\n  abort(reason) {\n    if (this.signal.aborted) return;\n\n    this.signal.aborted = true;\n\n    if (reason) this.signal.reason = reason;\n    else this.signal.reason = new Error(\"AbortError\");\n\n    this.signal.dispatchEvent(\"abort\");\n  }\n  toString() {\n    return \"[object AbortController]\";\n  }\n  get [Symbol.toStringTag]() {\n    return \"AbortController\";\n  }\n}\n\nmodule.exports = { AbortController, AbortSignal };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9kZS1hYm9ydC1jb250cm9sbGVyL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBLFFBQVEsZUFBZSxFQUFFLG1CQUFPLENBQUMsc0JBQVE7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsNkJBQTZCLEtBQUs7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9va2Jvb2tzaG9wbmcvLi9ub2RlX21vZHVsZXMvbm9kZS1hYm9ydC1jb250cm9sbGVyL2luZGV4LmpzP2Q4YmMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBFdmVudEVtaXR0ZXIgfSA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5cbmNsYXNzIEFib3J0U2lnbmFsIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5vbmFib3J0ID0gbnVsbDtcbiAgICB0aGlzLmFib3J0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlYXNvbiA9IHVuZGVmaW5lZDtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEFib3J0U2lnbmFsXVwiO1xuICB9XG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gXCJBYm9ydFNpZ25hbFwiO1xuICB9XG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcikge1xuICAgIHRoaXMuZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIGhhbmRsZXIpO1xuICB9XG4gIGFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcikge1xuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKG5hbWUsIGhhbmRsZXIpO1xuICB9XG4gIGRpc3BhdGNoRXZlbnQodHlwZSkge1xuICAgIGNvbnN0IGV2ZW50ID0geyB0eXBlLCB0YXJnZXQ6IHRoaXMgfTtcbiAgICBjb25zdCBoYW5kbGVyTmFtZSA9IGBvbiR7dHlwZX1gO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzW2hhbmRsZXJOYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB0aGlzW2hhbmRsZXJOYW1lXShldmVudCk7XG5cbiAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KHR5cGUsIGV2ZW50KTtcbiAgfVxuICB0aHJvd0lmQWJvcnRlZCgpIHtcbiAgICBpZiAodGhpcy5hYm9ydGVkKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGFib3J0KHJlYXNvbikge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgIHJldHVybiBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuICBzdGF0aWMgdGltZW91dCh0aW1lKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQobmV3IEVycm9yKFwiVGltZW91dEVycm9yXCIpKSwgdGltZSk7XG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG59XG5jbGFzcyBBYm9ydENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNpZ25hbCA9IG5ldyBBYm9ydFNpZ25hbCgpO1xuICB9XG4gIGFib3J0KHJlYXNvbikge1xuICAgIGlmICh0aGlzLnNpZ25hbC5hYm9ydGVkKSByZXR1cm47XG5cbiAgICB0aGlzLnNpZ25hbC5hYm9ydGVkID0gdHJ1ZTtcblxuICAgIGlmIChyZWFzb24pIHRoaXMuc2lnbmFsLnJlYXNvbiA9IHJlYXNvbjtcbiAgICBlbHNlIHRoaXMuc2lnbmFsLnJlYXNvbiA9IG5ldyBFcnJvcihcIkFib3J0RXJyb3JcIik7XG5cbiAgICB0aGlzLnNpZ25hbC5kaXNwYXRjaEV2ZW50KFwiYWJvcnRcIik7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBBYm9ydENvbnRyb2xsZXJdXCI7XG4gIH1cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiBcIkFib3J0Q29udHJvbGxlclwiO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBBYm9ydENvbnRyb2xsZXIsIEFib3J0U2lnbmFsIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/node-abort-controller/index.js\n");

/***/ })

};
;