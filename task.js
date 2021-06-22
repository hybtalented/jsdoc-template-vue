/* eslint-disable import/no-unresolved,max-classes-per-file */
var path = require('jsdoc/path');
var helper = require('jsdoc/util/templateHelper');
const util = require('./util');

function tutoriallink(tutorial) {
  return helper.toTutorial(tutorial, null, {
    tag: 'em',
    classname: 'disabled',
    prefix: 'Tutorial: '
  });
}
exports.RenderContext = class RenderContext {
  constructor(data, { view, env }) {
    this.view = view;
    this.env = env;
    this.outdir = path.normalize(env.opts.destination);
    this.data = data;
    this.find = spec => {
      const { data } = this;
      return helper.find(data, spec);
    };
  }

  initView(nav) {
    const { view, env } = this;
    var conf = env.conf.templates || {};
    const { linkto, resolveAuthorLinks, htmlsafe } = helper;
    view.find = this.find;
    view.linkto = linkto;
    view.resolveAuthorLinks = resolveAuthorLinks;
    view.tutoriallink = tutoriallink;
    view.htmlsafe = htmlsafe;
    view.outputSourceFiles = !!(conf.default && conf.default.outputSourceFiles !== false);
    // once for all
    view.nav = nav;
  }
};
exports.RenderTask = class RenderTask {
  /**
   * @summary task to render an object
   * @param {RenderContext} context
   * @param {*} param1
   */
  constructor(context, { component, title, docs, url, resolveLinks = false }) {
    this.context = context;
    this.component = component;
    this.title = title;
    this.docs = docs;
    this.filename = url;
    this.resolveLinks = resolveLinks !== false;
  }

  async run() {
    var html;
    var outpath;
    const { context, resolveLinks, title, docs, filename, component } = this;
    const { view, env, outdir, find } = context;

    const docData = {
      env: env,
      isTutorial: component === 'tutorial',
      title: title,
      docs: docs,
      package: find({ kind: 'package' })[0]
    };

    outpath = path.join(outdir, filename);
    html = await view.render(component, docData);

    if (resolveLinks) {
      html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
    }

    util.writeFile(outpath, html, 'utf8');
  }

  get id() {
    return this.filename;
  }
};

exports.TaskRunner = class TaskRunner {
  /**
   * @param {RenderTask[]} tasks
   */
  constructor(tasks, { max_tasks = 5 }) {
    this.max_tasks = max_tasks;
    this.running_task = new Array(max_tasks);
    this.tasks = tasks;
  }

  /**
   * @summary 运行所有任务
   */
  async start() {
    for (const task of this.tasks) {
      // eslint-disable-next-line no-await-in-loop
      await task.run();
    }
  }
};
