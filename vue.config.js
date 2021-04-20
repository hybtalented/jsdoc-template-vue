const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

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
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.output.libraryTarget('commonjs2');
      config.plugin('ssr').use(new VueSSRServerPlugin());
      config.optimization.splitChunks(false);
      config.module.rule('js').uses.delete('babel-loader');
      const index_entry = config.entry('index');
      index_entry.clear();
      index_entry.add(resolvePath('src/entry-server.js'));
    }
  },
  outputDir: resolvePath('template')
};
module.exports = vueConfig;
