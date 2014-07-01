var Lab = require('lab'),
    fs = require('fs'),
    formatter = require('../lib/formatter');

Lab.test('parse returns what the CommonJS module exports', function(done) {
    var code = fs.readFileSync(__dirname + '/fixtures/module.js');
    var result = formatter.parse(code);
    Lab.expect(result._id).to.equal('_design/user');
    Lab.expect(result.language).to.equal('javascript');
    done();
});

Lab.test('parser teturns functions as code strings', function(done) {
    var code = fs.readFileSync(__dirname + '/fixtures/module.js');
    var result = formatter.parse(code);
    Lab.expect(result.views.twitter.map).to.be.a('string');
    done();
});
