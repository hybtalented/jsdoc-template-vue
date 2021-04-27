exports.defineTags = function defineTags(dictionary) {
  dictionary.defineTag('component', {
    onTagged(doclet, { name }) {
      doclet.component = true;
      doclet.group = name;
    },
    canHaveName: true,
    isNamespace: true
  });
  dictionary.defineTag('group', {
    onTagged(doclet, { name }) {
      doclet.group = name;
    },
    canHaveName: true,
    isNamespace: true
  });
};
