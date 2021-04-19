const astBuilder = require('jsdoc/lib/jsdoc/src/astbuilder');
const TypeScriptVisitor = require('./hack/visitor');
require('./hack/walkers');
// 添加 typescript 支持
astBuilder.parserOptions.plugins.push('typescript');

exports.handlers = {
  newDoclet: function onNewDoclet(event) {}
};

exports.astNodeVisitor = { visitNode: TypeScriptVisitor };
