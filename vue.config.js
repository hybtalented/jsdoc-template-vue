const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const resolvePath = pathname => path.resolve(__dirname, pathname);

const rawArgv = process.argv.slice(2);
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
});
/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
const vueConfig = {
  publicPath: './',
  chainWebpack(config) {
    const entry = config.entry('index');
    const { output } = config;
    const ssr_plugin = config.plugin('ssr');
    if (args.target === 'lib') {
      entry.add(resolvePath('src/entry-server.js'));
      output.libraryExport('default');
      ssr_plugin.use(new VueSSRServerPlugin());

      config.optimization.splitChunks(false).minimize(false);
      // don't use babel-loader for ssr version
      config.module.rule('js').uses.delete('babel-loader');

      config.target('node').devtool('source-map');

      config.plugin('extract-css').tap(args => {
        args[0].filename = 'style.css';
        return args;
      });
      config.externals(['vue', 'vue-router', 'vuex']);
    } else {
      entry.add(resolvePath('src/entry-client.js'));
      ssr_plugin.use(new VueSSRClientPlugin());
    }
  },
  outputDir: resolvePath('template')
};
module.exports = vueConfig;
