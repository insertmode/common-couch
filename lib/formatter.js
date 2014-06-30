var fs = require('fs');
var util = require('util');
var formatter = require('atropa-jsformatter');

function liberateFunctions(s) {
    return s.replace(/\"\s*(function.*?\})[;\s]*\"/g, function(a,b) {
        return JSON.parse('{"x":"'+b+'"}').x;
    });
}

module.exports = {
    parse: function(s) {
        return JSON.parse(s);
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
