var clipboard = require("sdk/clipboard");
var runtime = require("sdk/system/runtime");
var self = require("sdk/self");

var cm = require("sdk/context-menu");
cm.Item({
    label: "コピー",
    accesskey: "C",
    context:
        cm.PredicateContext(function(context) {
            return context.selectionText == null && !context.isEditable;
        }),
    contentScriptFile: [ self.data.url("jquery-2.2.0.min.js"), self.data.url("menu.js") ],
    data: runtime.OS == "WINNT" ? "\r\n" : "\n",
    onMessage: function(text){
        clipboard.set(text);
    }
});