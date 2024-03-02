"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/fn-annotate";
exports.ids = ["vendor-chunks/fn-annotate"];
exports.modules = {

/***/ "(ssr)/./node_modules/fn-annotate/index.js":
/*!*******************************************!*\
  !*** ./node_modules/fn-annotate/index.js ***!
  \*******************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = annotate;\n\nfunction annotate(fn) {\n\n  if (typeof fn !== 'function') {\n    throw new Error('Could not parse function signature for injection dependencies: Object is not a function');\n  }\n\n  if (!fn.length) return [];\n\n  var injects = /^()\\(?([^)=]*)\\)? *=>/.exec(fn + '') ||\n                /^[^(]+([^ \\(]*) *\\(([^\\)]*)\\)/.exec(fn + '');\n\n  if (!injects) {\n    throw new Error('Could not parse function signature for injection dependencies: ' + fn + '');\n  }\n\n  var argumentString = injects[2]\n\n  // Strip multi-line comments:\n  // Uses the lazy-quantifier (.*?): http://www.rexegg.com/regex-quantifiers.html#lazy_solution\n  .replace(/\\/\\*[\\S\\s]*?\\*\\//g, ' ')\n\n  // Strip single-line comments:\n  .replace(/\\/\\/.*/g, ' ');\n\n  function groupSubArguments(_, type, keys) {\n    return type + keys.split(',')\n    .map(function (arg) {\n      return arg && arg.trim();\n    })\n    .filter(Boolean)\n    .join('@');\n  }\n\n  argumentString = argumentString.replace(/(\\{)([^}]*)\\}/g, groupSubArguments);\n  argumentString = argumentString.replace(/(\\[)([^}]*)\\]/g, groupSubArguments);\n\n  return argumentString.split(',')\n  .map(function (arg) {\n    return arg && arg.trim();\n  })\n  .map(function (arg) {\n    if (arg[0] === '{') {\n      return arg.substring(1).split('@');\n    }\n    if (arg[0] === '[') {\n      return { items: arg.substring(1).split('@') };\n    }\n    return arg;\n  })\n  .filter(Boolean);\n\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZm4tYW5ub3RhdGUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsS0FBSyxLQUFLO0FBQ3hELG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2tib29rc2hvcG5nLy4vbm9kZV9tb2R1bGVzL2ZuLWFubm90YXRlL2luZGV4LmpzPzMzOTkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFubm90YXRlO1xuXG5mdW5jdGlvbiBhbm5vdGF0ZShmbikge1xuXG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBmdW5jdGlvbiBzaWduYXR1cmUgZm9yIGluamVjdGlvbiBkZXBlbmRlbmNpZXM6IE9iamVjdCBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgaWYgKCFmbi5sZW5ndGgpIHJldHVybiBbXTtcblxuICB2YXIgaW5qZWN0cyA9IC9eKClcXCg/KFteKT1dKilcXCk/ICo9Pi8uZXhlYyhmbiArICcnKSB8fFxuICAgICAgICAgICAgICAgIC9eW14oXSsoW14gXFwoXSopICpcXCgoW15cXCldKilcXCkvLmV4ZWMoZm4gKyAnJyk7XG5cbiAgaWYgKCFpbmplY3RzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2UgZnVuY3Rpb24gc2lnbmF0dXJlIGZvciBpbmplY3Rpb24gZGVwZW5kZW5jaWVzOiAnICsgZm4gKyAnJyk7XG4gIH1cblxuICB2YXIgYXJndW1lbnRTdHJpbmcgPSBpbmplY3RzWzJdXG5cbiAgLy8gU3RyaXAgbXVsdGktbGluZSBjb21tZW50czpcbiAgLy8gVXNlcyB0aGUgbGF6eS1xdWFudGlmaWVyICguKj8pOiBodHRwOi8vd3d3LnJleGVnZy5jb20vcmVnZXgtcXVhbnRpZmllcnMuaHRtbCNsYXp5X3NvbHV0aW9uXG4gIC5yZXBsYWNlKC9cXC9cXCpbXFxTXFxzXSo/XFwqXFwvL2csICcgJylcblxuICAvLyBTdHJpcCBzaW5nbGUtbGluZSBjb21tZW50czpcbiAgLnJlcGxhY2UoL1xcL1xcLy4qL2csICcgJyk7XG5cbiAgZnVuY3Rpb24gZ3JvdXBTdWJBcmd1bWVudHMoXywgdHlwZSwga2V5cykge1xuICAgIHJldHVybiB0eXBlICsga2V5cy5zcGxpdCgnLCcpXG4gICAgLm1hcChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnICYmIGFyZy50cmltKCk7XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgLmpvaW4oJ0AnKTtcbiAgfVxuXG4gIGFyZ3VtZW50U3RyaW5nID0gYXJndW1lbnRTdHJpbmcucmVwbGFjZSgvKFxceykoW159XSopXFx9L2csIGdyb3VwU3ViQXJndW1lbnRzKTtcbiAgYXJndW1lbnRTdHJpbmcgPSBhcmd1bWVudFN0cmluZy5yZXBsYWNlKC8oXFxbKShbXn1dKilcXF0vZywgZ3JvdXBTdWJBcmd1bWVudHMpO1xuXG4gIHJldHVybiBhcmd1bWVudFN0cmluZy5zcGxpdCgnLCcpXG4gIC5tYXAoZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiBhcmcgJiYgYXJnLnRyaW0oKTtcbiAgfSlcbiAgLm1hcChmdW5jdGlvbiAoYXJnKSB7XG4gICAgaWYgKGFyZ1swXSA9PT0gJ3snKSB7XG4gICAgICByZXR1cm4gYXJnLnN1YnN0cmluZygxKS5zcGxpdCgnQCcpO1xuICAgIH1cbiAgICBpZiAoYXJnWzBdID09PSAnWycpIHtcbiAgICAgIHJldHVybiB7IGl0ZW1zOiBhcmcuc3Vic3RyaW5nKDEpLnNwbGl0KCdAJykgfTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZztcbiAgfSlcbiAgLmZpbHRlcihCb29sZWFuKTtcblxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/fn-annotate/index.js\n");

/***/ })

};
;