/* eslint-disable no-console */
const CLIService = require('@vue/cli-service');
const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const fs = require('fs');

let outputFileSystem = null;
let outputDir;
const messageHandler = {
  onmessage: null
};
const sendMessage = msg => {
  console.info('on message ', msg);
  if (typeof messageHandler.onmessage === 'function') {
    return messageHandler.onmessage(msg);
  } else {
    return false;
  }
};
const readFile = (origin_fs, file) => {
  try {
    const fullpath = path.join(outputDir, file);
    if (typeof origin_fs.readFileSync === 'function') {
      return origin_fs.readFileSync(fullpath, 'utf-8');
    } else {
      return fs.readFileSync(fullpath, 'utf-8');
    }
  } catch (e) {
    return null;
  }
};
const compiler_finish_callback = compile_stats => {
  const stats = compile_stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(err => console.warn(err));
  if (stats.errors.length) return;
  try {
    const clientManifest = JSON.parse(readFile(outputFileSystem, 'vue-ssr-client-manifest.json'));
    const serverBundle = JSON.parse(readFile(outputFileSystem, 'vue-ssr-server-bundle.json'));
    sendMessage({
      type: 'update',
      manifest: clientManifest,
      bundle: serverBundle
    });
  } catch (ex) {
    console.log('unexpect error occur when update ssr manifest and bundle， err', ex);
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
          compiler.outputFileSystem = outputFileSystem;
          compiler.hooks.done.tap('ssr server bundle plugin', compiler_finish_callback);
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
      if (isDevelopment) {
        // in dev mode, enable ssr server
        api.configureDevServer(app => {
          app.get('*', (req, res, next) => {
            const s = Date.now();
            res.setHeader('Content-Type', 'text/html');
            const handleError = err => {
              if (err.url) {
                res.redirect(err.url);
              } else if (err.code === 404) {
                res.status(404).send('404 | Page Not Found');
              } else {
                // Render Error Page or Redirect
                res.status(500).send('500 | Internal Server Error');
                console.error(`error during render : ${req.url}`);
                console.error(err.stack);
              }
            };
            const handleResult = html => {
              res.send(html);
              console.log(`whole request: ${Date.now() - s}ms`);
            };
            const ok = sendMessage({
              type: 'request',
              url: req.url,
              onerror: handleError,
              onload: handleResult
            });
            if (!ok) {
              next('route');
            }
          });
        });
      }
      ssr_plugin.use(new VueSSRClientPlugin());
      ssr_compiler_plugin.use({
        apply: compiler => {
          let bundle_start = false;
          // for main compiler
          compiler.hooks.done.tap('ssr client plugin', compiler_stats => {
            if (!bundle_start) {
              const serverService = new CLIService(api.getCwd());
              outputFileSystem = compiler.outputFileSystem;
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
            compiler_finish_callback(compiler_stats);
          });
        }
      });
    }
  });
};

servicePlugin.messageHandler = {
  onmessage: null
};

module.exports = servicePlugin;
