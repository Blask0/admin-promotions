ace.define(
  'ace/theme/vtex',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  function(acequire, exports, module) {
    exports.isDark = false
    exports.cssClass = 'ace-vtex'
    exports.cssText =
      '\
    .ace-vtex .ace_gutter {\
    background: #F7F9FA;\
    color: #979899;\
    }\
    .ace-vtex  {\
    background: #FFF;\
    color: #142032;\
    border-radius: .25rem;\
    border: .125rem solid #e3e4e6;\
    }\
    .ace-vtex .ace_keyword {\
    font-weight: bold;\
    }\
    .ace-vtex .ace_string {\
    color: #DD1659;\
    }\
    .ace-vtex .ace_variable.ace_class {\
    color: teal;\
    }\
    .ace-vtex .ace_constant.ace_numeric {\
    color: #3D5980;\
    }\
    .ace-vtex .ace_constant.ace_buildin {\
    color: #8914CC;\
    }\
    .ace-vtex .ace_support.ace_function {\
    color: #8914CC;\
    }\
    .ace-vtex .ace_comment {\
    color: #998;\
    font-style: italic;\
    }\
    .ace-vtex .ace_variable.ace_language  {\
    color: #8914CC;\
    }\
    .ace_tooltip {\
      background-color: #FFF;\
      background-image: none;\
      border: none;\
      border-radius: 5px;\
      box-shadow: 0 3px 9px 0 rgba(61, 62, 64, 0.2);\
      color: #142032;\
      padding: 6px 8px;\
      z-index: 999999;\
      font-weight: bold;\
    }\
    .ace-vtex .ace_gutter-cell.ace_error {\
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTE1LjIxNiAxMy41MjlMOC44ODIgMS42NTRhMSAxIDAgMCAwLTEuNzY1IDBMLjc4NCAxMy41MjlBMSAxIDAgMCAwIDEuNjY3IDE1aDEyLjY2N2ExIDEgMCAwIDAgLjg4Mi0xLjQ3MXpNOCAxM2ExIDEgMCAxIDEgMC0yIDEgMSAwIDAgMSAwIDJ6bTEtM0g3VjZoMnY0eiIgZmlsbD0iI2ZjNGU1MSIvPjwvc3ZnPg==);\
      background-repeat: no-repeat;\
      background-position: 2px center;\
    }\
    .ace-vtex .ace_paren {\
    font-weight: bold;\
    }\
    .ace-vtex .ace_boolean {\
    font-weight: bold;\
    }\
    .ace-vtex .ace_string.ace_regexp {\
    color: #8bc34a;\
    font-weight: normal;\
    }\
    .ace-vtex .ace_variable.ace_instance {\
    color: teal;\
    }\
    .ace-vtex .ace_constant.ace_language {\
    font-weight: bold;\
    }\
    .ace-vtex .ace_cursor {\
    color: black;\
    }\
    .ace-vtex.ace_focus .ace_marker-layer .ace_active-line {\
    background: #EDF4FA;\
    }\
    .ace-vtex .ace_marker-layer .ace_active-line {\
    background: #edf4fa;\
    }\
    .ace-vtex .ace_marker-layer .ace_selection {\
    background: #cce8ff;\
    }\
    .ace-vtex.ace_multiselect .ace_selection.ace_start {\
    box-shadow: 0 0 3px 0px white;\
    }\
    .ace-vtex.ace_nobold .ace_line > span {\
    font-weight: normal !important;\
    }\
    .ace-vtex .ace_marker-layer .ace_step {\
    background: rgb(252, 255, 0);\
    }\
    .ace-vtex .ace_marker-layer .ace_stack {\
    background: rgb(164, 229, 101);\
    }\
    .ace-vtex .ace_marker-layer .ace_bracket {\
    margin: -1px 0 0 -1px;\
    border: 1px solid rgb(192, 192, 192);\
    }\
    .ace-vtex .ace_gutter-active-line {\
    background-color : rgba(0, 0, 0, 0.07);\
    }\
    .ace-vtex .ace_marker-layer .ace_selected-word {\
    background: rgb(250, 250, 255);\
    border: 1px solid #8914CC;\
    }\
    .ace-vtex .ace_invisible {\
    color: #BFBFBF\
    }\
    .ace-vtex .ace_print-margin {\
    width: 1px;\
    background: #e8e8e8;\
    }\
    .ace-vtex .ace_variable {\
    color: #DD1659;\
    }\
    .ace-vtex .ace_indent-guide {\
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;\
    }\
    .ace-vtex .ace_scroller.ace_scroll-left {\
    box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.2) inset;\
    }'

    var dom = acequire('../lib/dom')
    dom.importCssString(exports.cssText, exports.cssClass)
  }
)
