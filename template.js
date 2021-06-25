/* eslint-disable global-require,import/no-dynamic-require */

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
    const clientManifest = typeof manifest === 'string' ? require(manifest) : manifest;
    this.renderer = createBundleRenderer(bundle, {
      template: fs.readFileSync(layout, 'utf-8'),
      runInNewContext: false,
      inject: false,
      cache: this.cache,
      clientManifest
    });
  }

  /**
   * Renders template with given data.
   *
   * This method automaticaly applies layout if set.
   *
   * @param {string} file - Template filename.
   * @param {string} title - html title
   * @param {object} data - Template variables (doesn't have to be object, but passing variables dictionary is best way and most common use).
   * @return {Promise<string>} Rendered template.
   */
  render(file, title, data) {
    return this.renderer.renderToString({ url: `/${file}`, title, data, view: this });
  }
}
exports.Template = Template;
