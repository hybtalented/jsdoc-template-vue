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

const assetsDir = 'static';
/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
const vueConfig = {
  publicPath: './',
  outputDir: resolvePath('template'),
  assetsDir,
  chainWebpack(config) {
    const { output } = config;
    const ssr_plugin = config.plugin('ssr');

    if (args.target === 'lib') {
      output.libraryExport('default');
      ssr_plugin.use(new VueSSRServerPlugin());
      // don't optimize for server version
      config.optimization.splitChunks(false).minimize(false);

      // don't use babel-loader for ssr version
      config.module.rule('js').uses.delete('babel-loader');

      config.target('node').devtool('source-map');

      config.externals(['vue', 'vue-router', 'vuex']);
    } else {
      ssr_plugin.use(new VueSSRClientPlugin());
      config.plugin('copy').tap(args => {
        args[0][0].to = path.join(config.output.get('path'), assetsDir);
        return args;
      });
    }
  }
};
module.exports = vueConfig;
