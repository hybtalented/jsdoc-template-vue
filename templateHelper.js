/* eslint-disable import/no-unresolved */
const helper = require('jsdoc/util/templateHelper');
const tutorial = require('jsdoc/tutorial');

const MODULE_NAMESPACE = 'module:';
/**
 * Find items in a TaffyDB database that match the specified key-value pairs.
 *
 * @function
 * @param {TAFFY} data The TaffyDB database to search.
 * @param {object|function} spec Key-value pairs to match against (for example,
 * `{ longname: 'foo' }`), or a function that returns `true` if a value matches or `false` if it
 * does not match.
 * @return {array<object>} The matching items.
 */
const find = (data, spec) => data(spec).get();
exports.find = find;
/**
 * Check whether a symbol is the only symbol exported by a module (as in
 * `module.exports = function() {};`).
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet for the symbol.
 * @return {boolean} `true` if the symbol is the only symbol exported by a module; otherwise,
 * `false`.
 */
function isModuleExports(doclet) {
  return doclet.longname && doclet.longname === doclet.name && doclet.longname.indexOf(MODULE_NAMESPACE) === 0 && doclet.kind !== 'module';
}

/**
 * Retrieve all of the following types of members from a set of doclets:
 *
 * + Classes
 * + Components
 * + Externals
 * + Globals
 * + Mixins
 * + Modules
 * + Namespaces
 * + Events
 * @param {TAFFY} data The TaffyDB database to search.
 * @return {object} An object with `classes`, `externals`, `globals`, `mixins`, `modules`,
 * `events`, and `namespaces` properties. Each property contains an array of objects.
 */
exports.getMembers = data => {
  const members = {
    classes: data({ kind: 'class' }, [{ isComponent: { isUndefined: true } }, { isComponent: false }]).get(),
    components: find(data, { isComponent: true }),
    externals: find(data, { kind: 'external' }),
    events: find(data, { kind: 'event' }),
    globals: find(data, {
      kind: ['member', 'function', 'constant', 'typedef'],
      memberof: { isUndefined: true }
    }),
    mixins: find(data, { kind: 'mixin' }),
    modules: find(data, { kind: 'module' }),
    namespaces: find(data, { kind: 'namespace' }),
    interfaces: find(data, { kind: 'interface' }),
    tutorials: find(data, { kind: 'tutorial', memberof: { isUndefined: true } })
  };

  // strip quotes from externals, since we allow quoted names that would normally indicate a
  // namespace hierarchy (as in `@external "jquery.fn"`)
  // TODO: we should probably be doing this for other types of symbols, here or elsewhere; see
  // jsdoc3/jsdoc#396
  members.externals = members.externals.map(doclet => {
    doclet.name = doclet.name.replace(/(^"|"$)/g, '');

    return doclet;
  });

  // functions that are also modules (as in `module.exports = function() {};`) are not globals
  members.globals = members.globals.filter(doclet => !isModuleExports(doclet));

  return members;
};
function resolveMarkdown(markdownstring) {
  return helper.resolveLinks(markdownstring);
}
exports.resolveMarkdown = resolveMarkdown;
function generateDoclet(theTutorial) {
  let tutorialContent;
  var isHtmlTutorial = theTutorial.type === tutorial.TYPES.HTML;
  if (isHtmlTutorial) {
    //   _.extend(tutorialData, generateHtmlTutorialData(tutorial, fileName, originalFileName));
  } else {
    // yes, you can use {@link} in tutorials too!
    tutorialContent = resolveMarkdown(theTutorial.parse());
  }
  var fileName = helper.tutorialToUrl(theTutorial.name);
  var longname = `${fileName.replace('.html', '')}`;
  helper.registerLink(longname, fileName);

  return {
    kind: 'tutorial',
    isHtmlTutorial,
    title: theTutorial.title,
    content: tutorialContent,
    name: theTutorial.name,
    longname: longname
  };
}

exports.generateTutorialDoclets = tutorials => {
  const tutorials_docs = [];

  // tutorials can have only one parent so there is no risk for loops
  function generateChildrenDoclet(node, parentDoclet = null) {
    node.children.forEach(async child => {
      const doclet = generateDoclet(child);
      if (parentDoclet) {
        doclet.memberof = parentDoclet.longname;
      }
      tutorials_docs.push(doclet);
      generateChildrenDoclet(child, doclet);
    });
  }
  generateChildrenDoclet(tutorials);
  return tutorials_docs;
};
