"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/widest-line";
exports.ids = ["vendor-chunks/widest-line"];
exports.modules = {

/***/ "(ssr)/./node_modules/widest-line/index.js":
/*!*******************************************!*\
  !*** ./node_modules/widest-line/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst stringWidth = __webpack_require__(/*! string-width */ \"(ssr)/./node_modules/string-width/index.js\");\n\nconst widestLine = input => {\n\tlet max = 0;\n\n\tfor (const line of input.split('\\n')) {\n\t\tmax = Math.max(max, stringWidth(line));\n\t}\n\n\treturn max;\n};\n\nmodule.exports = widestLine;\n// TODO: remove this in the next major version\nmodule.exports[\"default\"] = widestLine;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2lkZXN0LWxpbmUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYixvQkFBb0IsbUJBQU8sQ0FBQyxnRUFBYzs7QUFFMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2tib29rc2hvcG5nLy4vbm9kZV9tb2R1bGVzL3dpZGVzdC1saW5lL2luZGV4LmpzPzM1ZjUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc3RyaW5nV2lkdGggPSByZXF1aXJlKCdzdHJpbmctd2lkdGgnKTtcblxuY29uc3Qgd2lkZXN0TGluZSA9IGlucHV0ID0+IHtcblx0bGV0IG1heCA9IDA7XG5cblx0Zm9yIChjb25zdCBsaW5lIG9mIGlucHV0LnNwbGl0KCdcXG4nKSkge1xuXHRcdG1heCA9IE1hdGgubWF4KG1heCwgc3RyaW5nV2lkdGgobGluZSkpO1xuXHR9XG5cblx0cmV0dXJuIG1heDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gd2lkZXN0TGluZTtcbi8vIFRPRE86IHJlbW92ZSB0aGlzIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb25cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSB3aWRlc3RMaW5lO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/widest-line/index.js\n");

/***/ })

};
;