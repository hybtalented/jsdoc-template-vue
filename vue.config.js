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

const isSsr = args.target === 'lib';
const assetsDir = 'static';
/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
const vueConfig = {
  publicPath: './',
  outputDir: resolvePath('template'),
  assetsDir,
  chainWebpack(config) {
    const { output, entryPoints } = config;
    const ssr_plugin = config.plugin('ssr');
    entryPoints.clear();
    if (isSsr) {
      output.libraryExport('default');
      ssr_plugin.use(new VueSSRServerPlugin());
      // don't optimize for server version
      config.optimization.splitChunks(false).minimize(false);

      // don't use babel-loader for ssr version
      config.module.rule('js').uses.delete('babel-loader');
      config
        .target('node')
        .devtool('source-map')
        .externals(['vue', 'vue-router', 'vuex']);
      config.entry('index').add(resolvePath('src/entry-client'));
    } else {
      ssr_plugin.use(new VueSSRClientPlugin());
      if (config.plugins.has('copy')) {
        config.plugin('copy').tap(args => {
          args[0][0].to = path.join(config.output.get('path'), assetsDir);
          return args;
        });
      }
      config.entry('index').add(resolvePath('src/entry-server'));
    }
  }
};
module.exports = vueConfig;
