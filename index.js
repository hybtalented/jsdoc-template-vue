/* eslint-disable no-console */
const CLIService = require('@vue/cli-service');
const path = require('path');
const Template = require('./template');

const resolvePath = pathname => path.resolve(__dirname, pathname);

const isDevelopment = process.argv[1] === 'serve';

const assetsDir = 'static';
let ssrBundle;
let clientManifest;
let template;
function updateTemplater() {
  template = Template;
}
/**
 * @type {import("@vue/cli-service").ServicePlugin}
 */
const servicePlugin = (api, config) => {
  const readFile = (fs, file) => {
    try {
      return fs.readFileSync(path.join(config.outputDir, file), 'utf-8');
    } catch (e) {}
  };
  if (isDevelopment) {
    if (api.service.mode === 'development') {
      // dev server
      const serverService = new CLIService(api.getCwd());
      serverService.run('build', {
        mode: 'production',
        target: 'lib',
        formats: 'commonjs',
        watch: true
      });

      api.configureDevServer((app, server) => {
        app.get('*');
        server.compiler.hooks.done.tap('update ssr client manifest', compile_stats => {
          const stats = compile_stats.toJson();
          stats.errors.forEach(err => console.error(err));
          stats.warnings.forEach(err => console.warn(err));
          if (stats.errors.length) return;
          clientManifest = JSON.parse(readFile(server.middleware.fileSystem, 'vue-ssr-client-manifest.json'));
        });
      });
    } else {
      // ssr server build
      api.chainWebpack(config => {
        config.plugin('server-bundle-plugin').use(resolvePath('server-bundle-plugin'), [
          newBundle => {
            ssrBundle = newBundle;
          },
          readFile
        ]);
      });
    }
  }
};

module.exports = servicePlugin;
