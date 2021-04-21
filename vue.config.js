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
      config.output
        .filename('js/index.esm.js')
        .libraryTarget('commonjs2')
        .libraryExport('default');
      config.plugin('ssr').use(new VueSSRServerPlugin());
      //   config.plugin('ssr').use(new VueSSRServerPlugin());
      config.optimization.splitChunks(false).minimize(false);
      config.module.rule('js').uses.delete('babel-loader');
      config.target('node');
      config.devtool('source-map');
      config
        .entry('index')
        .clear()
        .add(resolvePath('src/entry-server.js'));
      config.plugin('extract-css').tap(args => {
        args[0].filename = 'style.css';
        return args;
      });
      config.externals(['vue', 'vue-router', 'vuex']);
    }
  },
  outputDir: resolvePath('template')
};
module.exports = vueConfig;
