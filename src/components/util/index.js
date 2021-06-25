export { default as ExtractHTML } from './extracthtml';
export { default as Fragment } from './fragment';
export { default as LinkTo } from './linkto.vue';
export function getIDByLongname(longname) {
  return encodeURI(longname.replace(/"/g, '_')).replace(/[\\/:%]/g, '-');
}
