exports.defineTags = function defineTags(dictionary) {
  dictionary.defineTag('group', {
    onTagged(doclet, { name }) {
      doclet.group = name;
    },
    canHaveName: true,
    isNamespace: true
  });
};
function getRedirectDoclet(doclet) {
  let redirectDoclet = doclet;
  while (redirectDoclet && redirectDoclet.redirectDoclet) {
    redirectDoclet = redirectDoclet.redirectDoclet;
  }
  return redirectDoclet;
}
// Given an event, get the parent node's doclet.
function getParentDoclet(parser, node) {
  if (node && node.parent) {
    return getRedirectDoclet(parser._getDocletById(node.parent.nodeId));
  }

  return null;
}

function VueComponentFinisher(e) {
  const doclet = getRedirectDoclet(e.doclet);
  if (doclet && doclet.augments && doclet.augments.indexOf('Vue') >= 0) {
    doclet.isComponent = true;
    doclet.undocumented = false;
  }
}
function VueMethodFinisher(e) {
  const { doclet } = e;
  if (doclet && doclet.name === '$emit') {
    doclet.kind = 'event';
  }
}

exports.astNodeVisitor = {
  visitNode(node, e, parser) {
    switch (node.type) {
      case 'ClassDeclaration':
        e.finishers.push(VueComponentFinisher);
        break;
      case 'MethodDefinition':
        {
          const parentDoclet = getParentDoclet(parser, node.parent);
          if (parentDoclet && parentDoclet.isComponent) {
            e.finishers.push(VueMethodFinisher);
          }
        }
        break;
      default:
        break;
    }
  }
};
