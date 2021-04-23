const protoName = '__proto__';
export function objectExtends(node, vnode) {
  node[protoName] = vnode;
  return node;
}
