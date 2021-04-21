/**
 * Wrapper for underscore's template utility to allow loading templates from files.
 * @module jsdoc/template
 */
const fs = require('jsdoc/fs');
const { createBundleRenderer } = require('vue-server-renderer');
/**
 * Underscore template helper.
 */
class Template {
  /**
   * @param {string} filepath - Templates directory.
   */
  constructor(bundle) {
    this.layout = null;
    this.cache = {};
    this.renderer = createBundleRenderer(bundle, {
      runInNewContext: false
    });
  }

  /**
   * Renders template with given data.
   *
   * This method automaticaly applies layout if set.
   *
   * @param {string} file - Template filename.
   * @param {object} data - Template variables (doesn't have to be object, but passing variables dictionary is best way and most common use).
   * @return {Promise<string>} Rendered template.
   */
  render(file, data) {
    return this.renderer.renderToString({ url: file, data: data, view: this });
  }
}
exports.Template = Template;
