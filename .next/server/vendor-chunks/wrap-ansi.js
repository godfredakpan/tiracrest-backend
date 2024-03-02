"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/wrap-ansi";
exports.ids = ["vendor-chunks/wrap-ansi"];
exports.modules = {

/***/ "(ssr)/./node_modules/wrap-ansi/index.js":
/*!*****************************************!*\
  !*** ./node_modules/wrap-ansi/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst stringWidth = __webpack_require__(/*! string-width */ \"(ssr)/./node_modules/string-width/index.js\");\nconst stripAnsi = __webpack_require__(/*! strip-ansi */ \"(ssr)/./node_modules/strip-ansi/index.js\");\nconst ansiStyles = __webpack_require__(/*! ansi-styles */ \"(ssr)/./node_modules/ansi-styles/index.js\");\n\nconst ESCAPES = new Set([\n\t'\\u001B',\n\t'\\u009B'\n]);\n\nconst END_CODE = 39;\n\nconst ANSI_ESCAPE_BELL = '\\u0007';\nconst ANSI_CSI = '[';\nconst ANSI_OSC = ']';\nconst ANSI_SGR_TERMINATOR = 'm';\nconst ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;\n\nconst wrapAnsi = code => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;\nconst wrapAnsiHyperlink = uri => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${uri}${ANSI_ESCAPE_BELL}`;\n\n// Calculate the length of words split on ' ', ignoring\n// the extra characters added by ansi escape codes\nconst wordLengths = string => string.split(' ').map(character => stringWidth(character));\n\n// Wrap a long word across multiple rows\n// Ansi escape codes do not count towards length\nconst wrapWord = (rows, word, columns) => {\n\tconst characters = [...word];\n\n\tlet isInsideEscape = false;\n\tlet isInsideLinkEscape = false;\n\tlet visible = stringWidth(stripAnsi(rows[rows.length - 1]));\n\n\tfor (const [index, character] of characters.entries()) {\n\t\tconst characterLength = stringWidth(character);\n\n\t\tif (visible + characterLength <= columns) {\n\t\t\trows[rows.length - 1] += character;\n\t\t} else {\n\t\t\trows.push(character);\n\t\t\tvisible = 0;\n\t\t}\n\n\t\tif (ESCAPES.has(character)) {\n\t\t\tisInsideEscape = true;\n\t\t\tisInsideLinkEscape = characters.slice(index + 1).join('').startsWith(ANSI_ESCAPE_LINK);\n\t\t}\n\n\t\tif (isInsideEscape) {\n\t\t\tif (isInsideLinkEscape) {\n\t\t\t\tif (character === ANSI_ESCAPE_BELL) {\n\t\t\t\t\tisInsideEscape = false;\n\t\t\t\t\tisInsideLinkEscape = false;\n\t\t\t\t}\n\t\t\t} else if (character === ANSI_SGR_TERMINATOR) {\n\t\t\t\tisInsideEscape = false;\n\t\t\t}\n\n\t\t\tcontinue;\n\t\t}\n\n\t\tvisible += characterLength;\n\n\t\tif (visible === columns && index < characters.length - 1) {\n\t\t\trows.push('');\n\t\t\tvisible = 0;\n\t\t}\n\t}\n\n\t// It's possible that the last row we copy over is only\n\t// ansi escape characters, handle this edge-case\n\tif (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {\n\t\trows[rows.length - 2] += rows.pop();\n\t}\n};\n\n// Trims spaces from a string ignoring invisible sequences\nconst stringVisibleTrimSpacesRight = string => {\n\tconst words = string.split(' ');\n\tlet last = words.length;\n\n\twhile (last > 0) {\n\t\tif (stringWidth(words[last - 1]) > 0) {\n\t\t\tbreak;\n\t\t}\n\n\t\tlast--;\n\t}\n\n\tif (last === words.length) {\n\t\treturn string;\n\t}\n\n\treturn words.slice(0, last).join(' ') + words.slice(last).join('');\n};\n\n// The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode\n//\n// 'hard' will never allow a string to take up more than columns characters\n//\n// 'soft' allows long words to expand past the column length\nconst exec = (string, columns, options = {}) => {\n\tif (options.trim !== false && string.trim() === '') {\n\t\treturn '';\n\t}\n\n\tlet returnValue = '';\n\tlet escapeCode;\n\tlet escapeUrl;\n\n\tconst lengths = wordLengths(string);\n\tlet rows = [''];\n\n\tfor (const [index, word] of string.split(' ').entries()) {\n\t\tif (options.trim !== false) {\n\t\t\trows[rows.length - 1] = rows[rows.length - 1].trimStart();\n\t\t}\n\n\t\tlet rowLength = stringWidth(rows[rows.length - 1]);\n\n\t\tif (index !== 0) {\n\t\t\tif (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {\n\t\t\t\t// If we start with a new word but the current row length equals the length of the columns, add a new row\n\t\t\t\trows.push('');\n\t\t\t\trowLength = 0;\n\t\t\t}\n\n\t\t\tif (rowLength > 0 || options.trim === false) {\n\t\t\t\trows[rows.length - 1] += ' ';\n\t\t\t\trowLength++;\n\t\t\t}\n\t\t}\n\n\t\t// In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'\n\t\tif (options.hard && lengths[index] > columns) {\n\t\t\tconst remainingColumns = (columns - rowLength);\n\t\t\tconst breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);\n\t\t\tconst breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);\n\t\t\tif (breaksStartingNextLine < breaksStartingThisLine) {\n\t\t\t\trows.push('');\n\t\t\t}\n\n\t\t\twrapWord(rows, word, columns);\n\t\t\tcontinue;\n\t\t}\n\n\t\tif (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {\n\t\t\tif (options.wordWrap === false && rowLength < columns) {\n\t\t\t\twrapWord(rows, word, columns);\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\trows.push('');\n\t\t}\n\n\t\tif (rowLength + lengths[index] > columns && options.wordWrap === false) {\n\t\t\twrapWord(rows, word, columns);\n\t\t\tcontinue;\n\t\t}\n\n\t\trows[rows.length - 1] += word;\n\t}\n\n\tif (options.trim !== false) {\n\t\trows = rows.map(stringVisibleTrimSpacesRight);\n\t}\n\n\tconst pre = [...rows.join('\\n')];\n\n\tfor (const [index, character] of pre.entries()) {\n\t\treturnValue += character;\n\n\t\tif (ESCAPES.has(character)) {\n\t\t\tconst {groups} = new RegExp(`(?:\\\\${ANSI_CSI}(?<code>\\\\d+)m|\\\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(pre.slice(index).join('')) || {groups: {}};\n\t\t\tif (groups.code !== undefined) {\n\t\t\t\tconst code = Number.parseFloat(groups.code);\n\t\t\t\tescapeCode = code === END_CODE ? undefined : code;\n\t\t\t} else if (groups.uri !== undefined) {\n\t\t\t\tescapeUrl = groups.uri.length === 0 ? undefined : groups.uri;\n\t\t\t}\n\t\t}\n\n\t\tconst code = ansiStyles.codes.get(Number(escapeCode));\n\n\t\tif (pre[index + 1] === '\\n') {\n\t\t\tif (escapeUrl) {\n\t\t\t\treturnValue += wrapAnsiHyperlink('');\n\t\t\t}\n\n\t\t\tif (escapeCode && code) {\n\t\t\t\treturnValue += wrapAnsi(code);\n\t\t\t}\n\t\t} else if (character === '\\n') {\n\t\t\tif (escapeCode && code) {\n\t\t\t\treturnValue += wrapAnsi(escapeCode);\n\t\t\t}\n\n\t\t\tif (escapeUrl) {\n\t\t\t\treturnValue += wrapAnsiHyperlink(escapeUrl);\n\t\t\t}\n\t\t}\n\t}\n\n\treturn returnValue;\n};\n\n// For each newline, invoke the method separately\nmodule.exports = (string, columns, options) => {\n\treturn String(string)\n\t\t.normalize()\n\t\t.replace(/\\r\\n/g, '\\n')\n\t\t.split('\\n')\n\t\t.map(line => exec(line, columns, options))\n\t\t.join('\\n');\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd3JhcC1hbnNpL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2Isb0JBQW9CLG1CQUFPLENBQUMsZ0VBQWM7QUFDMUMsa0JBQWtCLG1CQUFPLENBQUMsNERBQVk7QUFDdEMsbUJBQW1CLG1CQUFPLENBQUMsOERBQWE7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFNBQVMsR0FBRzs7QUFFeEMsNEJBQTRCLDhCQUE4QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsb0JBQW9CO0FBQ2xHLG9DQUFvQyw4QkFBOEIsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsaUJBQWlCOztBQUU5RztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxRQUFRLHFCQUFxQixTQUFTLG1CQUFtQixpQkFBaUIsWUFBWSxpQkFBaUIsd0NBQXdDO0FBQ3pKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2tib29rc2hvcG5nLy4vbm9kZV9tb2R1bGVzL3dyYXAtYW5zaS9pbmRleC5qcz8yZGY5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmNvbnN0IHN0cmluZ1dpZHRoID0gcmVxdWlyZSgnc3RyaW5nLXdpZHRoJyk7XG5jb25zdCBzdHJpcEFuc2kgPSByZXF1aXJlKCdzdHJpcC1hbnNpJyk7XG5jb25zdCBhbnNpU3R5bGVzID0gcmVxdWlyZSgnYW5zaS1zdHlsZXMnKTtcblxuY29uc3QgRVNDQVBFUyA9IG5ldyBTZXQoW1xuXHQnXFx1MDAxQicsXG5cdCdcXHUwMDlCJ1xuXSk7XG5cbmNvbnN0IEVORF9DT0RFID0gMzk7XG5cbmNvbnN0IEFOU0lfRVNDQVBFX0JFTEwgPSAnXFx1MDAwNyc7XG5jb25zdCBBTlNJX0NTSSA9ICdbJztcbmNvbnN0IEFOU0lfT1NDID0gJ10nO1xuY29uc3QgQU5TSV9TR1JfVEVSTUlOQVRPUiA9ICdtJztcbmNvbnN0IEFOU0lfRVNDQVBFX0xJTksgPSBgJHtBTlNJX09TQ304OztgO1xuXG5jb25zdCB3cmFwQW5zaSA9IGNvZGUgPT4gYCR7RVNDQVBFUy52YWx1ZXMoKS5uZXh0KCkudmFsdWV9JHtBTlNJX0NTSX0ke2NvZGV9JHtBTlNJX1NHUl9URVJNSU5BVE9SfWA7XG5jb25zdCB3cmFwQW5zaUh5cGVybGluayA9IHVyaSA9PiBgJHtFU0NBUEVTLnZhbHVlcygpLm5leHQoKS52YWx1ZX0ke0FOU0lfRVNDQVBFX0xJTkt9JHt1cml9JHtBTlNJX0VTQ0FQRV9CRUxMfWA7XG5cbi8vIENhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHdvcmRzIHNwbGl0IG9uICcgJywgaWdub3Jpbmdcbi8vIHRoZSBleHRyYSBjaGFyYWN0ZXJzIGFkZGVkIGJ5IGFuc2kgZXNjYXBlIGNvZGVzXG5jb25zdCB3b3JkTGVuZ3RocyA9IHN0cmluZyA9PiBzdHJpbmcuc3BsaXQoJyAnKS5tYXAoY2hhcmFjdGVyID0+IHN0cmluZ1dpZHRoKGNoYXJhY3RlcikpO1xuXG4vLyBXcmFwIGEgbG9uZyB3b3JkIGFjcm9zcyBtdWx0aXBsZSByb3dzXG4vLyBBbnNpIGVzY2FwZSBjb2RlcyBkbyBub3QgY291bnQgdG93YXJkcyBsZW5ndGhcbmNvbnN0IHdyYXBXb3JkID0gKHJvd3MsIHdvcmQsIGNvbHVtbnMpID0+IHtcblx0Y29uc3QgY2hhcmFjdGVycyA9IFsuLi53b3JkXTtcblxuXHRsZXQgaXNJbnNpZGVFc2NhcGUgPSBmYWxzZTtcblx0bGV0IGlzSW5zaWRlTGlua0VzY2FwZSA9IGZhbHNlO1xuXHRsZXQgdmlzaWJsZSA9IHN0cmluZ1dpZHRoKHN0cmlwQW5zaShyb3dzW3Jvd3MubGVuZ3RoIC0gMV0pKTtcblxuXHRmb3IgKGNvbnN0IFtpbmRleCwgY2hhcmFjdGVyXSBvZiBjaGFyYWN0ZXJzLmVudHJpZXMoKSkge1xuXHRcdGNvbnN0IGNoYXJhY3Rlckxlbmd0aCA9IHN0cmluZ1dpZHRoKGNoYXJhY3Rlcik7XG5cblx0XHRpZiAodmlzaWJsZSArIGNoYXJhY3Rlckxlbmd0aCA8PSBjb2x1bW5zKSB7XG5cdFx0XHRyb3dzW3Jvd3MubGVuZ3RoIC0gMV0gKz0gY2hhcmFjdGVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyb3dzLnB1c2goY2hhcmFjdGVyKTtcblx0XHRcdHZpc2libGUgPSAwO1xuXHRcdH1cblxuXHRcdGlmIChFU0NBUEVTLmhhcyhjaGFyYWN0ZXIpKSB7XG5cdFx0XHRpc0luc2lkZUVzY2FwZSA9IHRydWU7XG5cdFx0XHRpc0luc2lkZUxpbmtFc2NhcGUgPSBjaGFyYWN0ZXJzLnNsaWNlKGluZGV4ICsgMSkuam9pbignJykuc3RhcnRzV2l0aChBTlNJX0VTQ0FQRV9MSU5LKTtcblx0XHR9XG5cblx0XHRpZiAoaXNJbnNpZGVFc2NhcGUpIHtcblx0XHRcdGlmIChpc0luc2lkZUxpbmtFc2NhcGUpIHtcblx0XHRcdFx0aWYgKGNoYXJhY3RlciA9PT0gQU5TSV9FU0NBUEVfQkVMTCkge1xuXHRcdFx0XHRcdGlzSW5zaWRlRXNjYXBlID0gZmFsc2U7XG5cdFx0XHRcdFx0aXNJbnNpZGVMaW5rRXNjYXBlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSBBTlNJX1NHUl9URVJNSU5BVE9SKSB7XG5cdFx0XHRcdGlzSW5zaWRlRXNjYXBlID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZpc2libGUgKz0gY2hhcmFjdGVyTGVuZ3RoO1xuXG5cdFx0aWYgKHZpc2libGUgPT09IGNvbHVtbnMgJiYgaW5kZXggPCBjaGFyYWN0ZXJzLmxlbmd0aCAtIDEpIHtcblx0XHRcdHJvd3MucHVzaCgnJyk7XG5cdFx0XHR2aXNpYmxlID0gMDtcblx0XHR9XG5cdH1cblxuXHQvLyBJdCdzIHBvc3NpYmxlIHRoYXQgdGhlIGxhc3Qgcm93IHdlIGNvcHkgb3ZlciBpcyBvbmx5XG5cdC8vIGFuc2kgZXNjYXBlIGNoYXJhY3RlcnMsIGhhbmRsZSB0aGlzIGVkZ2UtY2FzZVxuXHRpZiAoIXZpc2libGUgJiYgcm93c1tyb3dzLmxlbmd0aCAtIDFdLmxlbmd0aCA+IDAgJiYgcm93cy5sZW5ndGggPiAxKSB7XG5cdFx0cm93c1tyb3dzLmxlbmd0aCAtIDJdICs9IHJvd3MucG9wKCk7XG5cdH1cbn07XG5cbi8vIFRyaW1zIHNwYWNlcyBmcm9tIGEgc3RyaW5nIGlnbm9yaW5nIGludmlzaWJsZSBzZXF1ZW5jZXNcbmNvbnN0IHN0cmluZ1Zpc2libGVUcmltU3BhY2VzUmlnaHQgPSBzdHJpbmcgPT4ge1xuXHRjb25zdCB3b3JkcyA9IHN0cmluZy5zcGxpdCgnICcpO1xuXHRsZXQgbGFzdCA9IHdvcmRzLmxlbmd0aDtcblxuXHR3aGlsZSAobGFzdCA+IDApIHtcblx0XHRpZiAoc3RyaW5nV2lkdGgod29yZHNbbGFzdCAtIDFdKSA+IDApIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGxhc3QtLTtcblx0fVxuXG5cdGlmIChsYXN0ID09PSB3b3Jkcy5sZW5ndGgpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0cmV0dXJuIHdvcmRzLnNsaWNlKDAsIGxhc3QpLmpvaW4oJyAnKSArIHdvcmRzLnNsaWNlKGxhc3QpLmpvaW4oJycpO1xufTtcblxuLy8gVGhlIHdyYXAtYW5zaSBtb2R1bGUgY2FuIGJlIGludm9rZWQgaW4gZWl0aGVyICdoYXJkJyBvciAnc29mdCcgd3JhcCBtb2RlXG4vL1xuLy8gJ2hhcmQnIHdpbGwgbmV2ZXIgYWxsb3cgYSBzdHJpbmcgdG8gdGFrZSB1cCBtb3JlIHRoYW4gY29sdW1ucyBjaGFyYWN0ZXJzXG4vL1xuLy8gJ3NvZnQnIGFsbG93cyBsb25nIHdvcmRzIHRvIGV4cGFuZCBwYXN0IHRoZSBjb2x1bW4gbGVuZ3RoXG5jb25zdCBleGVjID0gKHN0cmluZywgY29sdW1ucywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmIChvcHRpb25zLnRyaW0gIT09IGZhbHNlICYmIHN0cmluZy50cmltKCkgPT09ICcnKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGxldCBlc2NhcGVDb2RlO1xuXHRsZXQgZXNjYXBlVXJsO1xuXG5cdGNvbnN0IGxlbmd0aHMgPSB3b3JkTGVuZ3RocyhzdHJpbmcpO1xuXHRsZXQgcm93cyA9IFsnJ107XG5cblx0Zm9yIChjb25zdCBbaW5kZXgsIHdvcmRdIG9mIHN0cmluZy5zcGxpdCgnICcpLmVudHJpZXMoKSkge1xuXHRcdGlmIChvcHRpb25zLnRyaW0gIT09IGZhbHNlKSB7XG5cdFx0XHRyb3dzW3Jvd3MubGVuZ3RoIC0gMV0gPSByb3dzW3Jvd3MubGVuZ3RoIC0gMV0udHJpbVN0YXJ0KCk7XG5cdFx0fVxuXG5cdFx0bGV0IHJvd0xlbmd0aCA9IHN0cmluZ1dpZHRoKHJvd3Nbcm93cy5sZW5ndGggLSAxXSk7XG5cblx0XHRpZiAoaW5kZXggIT09IDApIHtcblx0XHRcdGlmIChyb3dMZW5ndGggPj0gY29sdW1ucyAmJiAob3B0aW9ucy53b3JkV3JhcCA9PT0gZmFsc2UgfHwgb3B0aW9ucy50cmltID09PSBmYWxzZSkpIHtcblx0XHRcdFx0Ly8gSWYgd2Ugc3RhcnQgd2l0aCBhIG5ldyB3b3JkIGJ1dCB0aGUgY3VycmVudCByb3cgbGVuZ3RoIGVxdWFscyB0aGUgbGVuZ3RoIG9mIHRoZSBjb2x1bW5zLCBhZGQgYSBuZXcgcm93XG5cdFx0XHRcdHJvd3MucHVzaCgnJyk7XG5cdFx0XHRcdHJvd0xlbmd0aCA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyb3dMZW5ndGggPiAwIHx8IG9wdGlvbnMudHJpbSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cm93c1tyb3dzLmxlbmd0aCAtIDFdICs9ICcgJztcblx0XHRcdFx0cm93TGVuZ3RoKys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSW4gJ2hhcmQnIHdyYXAgbW9kZSwgdGhlIGxlbmd0aCBvZiBhIGxpbmUgaXMgbmV2ZXIgYWxsb3dlZCB0byBleHRlbmQgcGFzdCAnY29sdW1ucydcblx0XHRpZiAob3B0aW9ucy5oYXJkICYmIGxlbmd0aHNbaW5kZXhdID4gY29sdW1ucykge1xuXHRcdFx0Y29uc3QgcmVtYWluaW5nQ29sdW1ucyA9IChjb2x1bW5zIC0gcm93TGVuZ3RoKTtcblx0XHRcdGNvbnN0IGJyZWFrc1N0YXJ0aW5nVGhpc0xpbmUgPSAxICsgTWF0aC5mbG9vcigobGVuZ3Roc1tpbmRleF0gLSByZW1haW5pbmdDb2x1bW5zIC0gMSkgLyBjb2x1bW5zKTtcblx0XHRcdGNvbnN0IGJyZWFrc1N0YXJ0aW5nTmV4dExpbmUgPSBNYXRoLmZsb29yKChsZW5ndGhzW2luZGV4XSAtIDEpIC8gY29sdW1ucyk7XG5cdFx0XHRpZiAoYnJlYWtzU3RhcnRpbmdOZXh0TGluZSA8IGJyZWFrc1N0YXJ0aW5nVGhpc0xpbmUpIHtcblx0XHRcdFx0cm93cy5wdXNoKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0d3JhcFdvcmQocm93cywgd29yZCwgY29sdW1ucyk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAocm93TGVuZ3RoICsgbGVuZ3Roc1tpbmRleF0gPiBjb2x1bW5zICYmIHJvd0xlbmd0aCA+IDAgJiYgbGVuZ3Roc1tpbmRleF0gPiAwKSB7XG5cdFx0XHRpZiAob3B0aW9ucy53b3JkV3JhcCA9PT0gZmFsc2UgJiYgcm93TGVuZ3RoIDwgY29sdW1ucykge1xuXHRcdFx0XHR3cmFwV29yZChyb3dzLCB3b3JkLCBjb2x1bW5zKTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHJvd3MucHVzaCgnJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHJvd0xlbmd0aCArIGxlbmd0aHNbaW5kZXhdID4gY29sdW1ucyAmJiBvcHRpb25zLndvcmRXcmFwID09PSBmYWxzZSkge1xuXHRcdFx0d3JhcFdvcmQocm93cywgd29yZCwgY29sdW1ucyk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRyb3dzW3Jvd3MubGVuZ3RoIC0gMV0gKz0gd29yZDtcblx0fVxuXG5cdGlmIChvcHRpb25zLnRyaW0gIT09IGZhbHNlKSB7XG5cdFx0cm93cyA9IHJvd3MubWFwKHN0cmluZ1Zpc2libGVUcmltU3BhY2VzUmlnaHQpO1xuXHR9XG5cblx0Y29uc3QgcHJlID0gWy4uLnJvd3Muam9pbignXFxuJyldO1xuXG5cdGZvciAoY29uc3QgW2luZGV4LCBjaGFyYWN0ZXJdIG9mIHByZS5lbnRyaWVzKCkpIHtcblx0XHRyZXR1cm5WYWx1ZSArPSBjaGFyYWN0ZXI7XG5cblx0XHRpZiAoRVNDQVBFUy5oYXMoY2hhcmFjdGVyKSkge1xuXHRcdFx0Y29uc3Qge2dyb3Vwc30gPSBuZXcgUmVnRXhwKGAoPzpcXFxcJHtBTlNJX0NTSX0oPzxjb2RlPlxcXFxkKyltfFxcXFwke0FOU0lfRVNDQVBFX0xJTkt9KD88dXJpPi4qKSR7QU5TSV9FU0NBUEVfQkVMTH0pYCkuZXhlYyhwcmUuc2xpY2UoaW5kZXgpLmpvaW4oJycpKSB8fCB7Z3JvdXBzOiB7fX07XG5cdFx0XHRpZiAoZ3JvdXBzLmNvZGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25zdCBjb2RlID0gTnVtYmVyLnBhcnNlRmxvYXQoZ3JvdXBzLmNvZGUpO1xuXHRcdFx0XHRlc2NhcGVDb2RlID0gY29kZSA9PT0gRU5EX0NPREUgPyB1bmRlZmluZWQgOiBjb2RlO1xuXHRcdFx0fSBlbHNlIGlmIChncm91cHMudXJpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZXNjYXBlVXJsID0gZ3JvdXBzLnVyaS5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBncm91cHMudXJpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGNvZGUgPSBhbnNpU3R5bGVzLmNvZGVzLmdldChOdW1iZXIoZXNjYXBlQ29kZSkpO1xuXG5cdFx0aWYgKHByZVtpbmRleCArIDFdID09PSAnXFxuJykge1xuXHRcdFx0aWYgKGVzY2FwZVVybCkge1xuXHRcdFx0XHRyZXR1cm5WYWx1ZSArPSB3cmFwQW5zaUh5cGVybGluaygnJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlc2NhcGVDb2RlICYmIGNvZGUpIHtcblx0XHRcdFx0cmV0dXJuVmFsdWUgKz0gd3JhcEFuc2koY29kZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09ICdcXG4nKSB7XG5cdFx0XHRpZiAoZXNjYXBlQ29kZSAmJiBjb2RlKSB7XG5cdFx0XHRcdHJldHVyblZhbHVlICs9IHdyYXBBbnNpKGVzY2FwZUNvZGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXNjYXBlVXJsKSB7XG5cdFx0XHRcdHJldHVyblZhbHVlICs9IHdyYXBBbnNpSHlwZXJsaW5rKGVzY2FwZVVybCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJldHVyblZhbHVlO1xufTtcblxuLy8gRm9yIGVhY2ggbmV3bGluZSwgaW52b2tlIHRoZSBtZXRob2Qgc2VwYXJhdGVseVxubW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nLCBjb2x1bW5zLCBvcHRpb25zKSA9PiB7XG5cdHJldHVybiBTdHJpbmcoc3RyaW5nKVxuXHRcdC5ub3JtYWxpemUoKVxuXHRcdC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpXG5cdFx0LnNwbGl0KCdcXG4nKVxuXHRcdC5tYXAobGluZSA9PiBleGVjKGxpbmUsIGNvbHVtbnMsIG9wdGlvbnMpKVxuXHRcdC5qb2luKCdcXG4nKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wrap-ansi/index.js\n");

/***/ })

};
;