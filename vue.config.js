const path = require('path');

const resolvePath = pathname => path.resolve(__dirname, pathname);
/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
const vueConfig = {
  pages: {
    index: {
      entry: resolvePath('src/entry-client.js')
    }
  },
  outputDir: resolvePath('template')
};
module.exports = vueConfig;
