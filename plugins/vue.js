exports.defineTags = function defineTags(dictionary) {
  dictionary.defineTag('group', {
    onTagged(doclet, { name }) {
      doclet.group = name;
    },
    canHaveName: true,
    isNamespace: true
  });
};
