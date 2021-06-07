/* eslint-disable no-console */
const CLIService = require('@vue/cli-service');
const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const util = require('./util');

let outputDir = '';
const readFile = file => {
  return util.readFile(path.join(outputDir, file));
};

const compiler_finish_callback = compile_stats => {
  const stats = compile_stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(err => console.warn(err));
  if (stats.errors.length) return Promise.resolve(false);
  try {
    const clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'));
    const serverBundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
    return util.sendMessage({
      type: 'update',
      manifest: clientManifest,
      bundle: serverBundle,
      outdir: outputDir
    });
  } catch (ex) {
    console.log('unexpect error occur when update ssr manifest and bundle， err', ex);
    return Promise.resolve(false);
  }
};

/**
 * @type {import("@vue/cli-service").ServicePlugin}
 */
const servicePlugin = api => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  // in ssr bundle mode, add webpack server-bundle-plugin to listen to the change of ssr bundle
  api.chainWebpack(config => {
    const isBundle = api.service.mode === 'ssr.bundle';
    const { output } = config;
    const ssr_plugin = config.plugin('ssr');
    const ssr_compiler_plugin = config.plugin('ssr_compiler_inspect');

    if (isBundle) {
      output.libraryExport('default');
      ssr_plugin.use(new VueSSRServerPlugin());
      ssr_compiler_plugin.use({
        apply: compiler => {
          // for ssr bundle compiler
          compiler.outputFileSystem = util.fs;
          compiler.hooks.done.tapPromise('ssr server bundle plugin', compiler_finish_callback);
        }
      });
      // don't optimize for server version
      config.optimization.splitChunks(false).minimize(false);

      // don't use babel-loader for ssr version
      config.module.rule('js').uses.delete('babel-loader');
      config
        .target('node')
        .devtool('source-map')
        .externals(['vue', 'vue-router', 'vuex']);
    } else {
      ssr_plugin.use(new VueSSRClientPlugin());
      ssr_compiler_plugin.use({
        apply: compiler => {
          let bundle_start = false;
          // for main compiler
          compiler.hooks.done.tapPromise('ssr client plugin', compiler_stats => {
            if (!bundle_start) {
              const serverService = new CLIService(api.getCwd());
              util.setup({
                fs: compiler.outputFileSystem
              });
              outputDir = compiler.outputPath;
              serverService.run('build', {
                mode: 'ssr.bundle',
                target: 'lib',
                formats: 'commonjs',
                watch: isDevelopment,
                silent: isDevelopment,
                clean: false,
                entry: 'src/entry-server.js'
              });
              bundle_start = true;
            }
            return compiler_finish_callback(compiler_stats);
          });
        }
      });
    }
  });
};

module.exports = servicePlugin;
