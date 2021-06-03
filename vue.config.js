const path = require('path');

const resolvePath = pathname => path.resolve(__dirname, pathname);
const assetsDir = 'static';
const contentOutputDir = 'template';
/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
const vueConfig = {
  publicPath: './',
  outputDir: resolvePath(contentOutputDir),
  assetsDir,
  chainWebpack(config) {
    if (config.plugins.has('copy')) {
      config.plugin('copy').tap(args => {
        args[0][0].to = path.join(config.output.get('path'), assetsDir);
        return args;
      });
    }
    config.entry('app').clear();
    config.entry('app').add(resolvePath('src/entry-client'));
  }
};
module.exports = vueConfig;
