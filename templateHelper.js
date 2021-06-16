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
    classes: find(data, { kind: 'class', isComponent: false }),
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
    interfaces: find(data, { kind: 'interface' })
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
