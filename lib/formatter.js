var fs = require('fs'),
    util = require('util'),
    formatter = require('atropa-jsformatter'),
    vm = require('vm');

function liberateFunctions(s) {
    return s.replace(/\"\s*(function.*?\})[;\s]*\"/g, function(a,b) {
        return JSON.parse('{"x":"'+b+'"}').x;
    });
}

function functionsToStrings(o) {
    for(var key in o) {
        if (typeof o[key] === 'object') {
            functionsToStrings(o[key]);
        } else if (typeof o[key] === 'function') {
            o[key] = o[key].toString();
        } 
    }
}

module.exports = {
    parse: function(s) {
        var sandbox = {
            module: {
                exports: {}
            }
        };
        vm.runInNewContext(s, sandbox);
        var o = sandbox.module.exports;
        functionsToStrings(o);
        console.dir(o);
        return o;
    },
    stringify: function(o) {
        var r = [];
        r.push('module.exports = ');
        r.push(liberateFunctions(JSON.stringify(o)));
        r.push(';\n');
        return formatter(r.join(''));
    },
    getFileName: function(doc) {
        var id = doc._id.replace('/', '-');
        return id + '.js';
    }
};
