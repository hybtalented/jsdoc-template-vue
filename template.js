/* eslint-disable import/no-dynamic-require,global-require */
/**
 * Wrapper for underscore's template utility to allow loading templates from files.
 * @module jsdoc/template
 */
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
/**
 * Underscore template helper.
 */
class Template {
  /**
   * @param {string} filepath - Templates directory.
   */
  constructor(layout, bundle, manifest) {
    this.cache = new Map();
    this.renderer = createBundleRenderer(bundle, {
      template: fs.readFileSync(layout, 'utf-8'),
      runInNewContext: false,
      inject: false,
      cache: this.cache,
      clientManifest: require(manifest)
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
    return this.renderer.renderToString({ url: `/${file}`, data, view: this });
  }
}
exports.Template = Template;
