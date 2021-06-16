/* eslint-disable global-require */
/* eslint-disable import/no-self-import */
/* eslint-disable import/no-unresolved */
var doop = require('jsdoc/util/doop');
var env = require('jsdoc/env');
var fs = require('jsdoc/fs');
var helper = require('jsdoc/util/templateHelper');
var logger = require('jsdoc/util/logger');
var path = require('jsdoc/path');
var { taffy } = require('taffydb');
var tutorial = require('jsdoc/tutorial');
const { Filter } = require('jsdoc/src/filter');
const { Scanner } = require('jsdoc/src/scanner');
const CLIService = require('@vue/cli-service');
const util = require('./util');
const { getMembers } = require('./templateHelper');
var { Template } = require('./template');

var { htmlsafe } = helper;
var { linkto } = helper;
var { resolveAuthorLinks } = helper;
var hasOwnProp = Object.prototype.hasOwnProperty;
var data;
var view;

let outdir = path.normalize(env.opts.destination);

env.conf.templates = {
  useCollapsibles: true,
  ...env.conf.templates
};

env.conf.templates.tabNames = {
  api: 'API',
  tutorials: 'Examples',
  ...env.conf.templates.tabNames
};

// Set default useCollapsibles true
env.conf.templates.useCollapsibles = env.conf.templates.useCollapsibles !== false;

function find(spec) {
  return helper.find(data, spec);
}

function tutoriallink(tutorial) {
  return helper.toTutorial(tutorial, null, {
    tag: 'em',
    classname: 'disabled',
    prefix: 'Tutorial: '
  });
}

function getAncestorLinks(doclet) {
  return helper.getAncestorLinks(data, doclet);
}

function hashToLink(doclet, hash) {
  var url;

  if (!/^(#.+)/.test(hash)) {
    return hash;
  }

  url = helper.createLink(doclet);
  url = url.replace(/(#.+|$)/, hash);

  return `<a href="${url}">${hash}</a>`;
}

function shortenPaths(files, commonPrefix) {
  Object.keys(files).forEach(file => {
    files[file].shortened = files[file].resolved
      .replace(commonPrefix, '')
      // always use forward slashes
      .replace(/\\/g, '/');
  });

  return files;
}

function getPathFromDoclet(doclet) {
  if (!doclet.meta) {
    return null;
  }

  return doclet.meta.path && doclet.meta.path !== 'null' ? path.join(doclet.meta.path, doclet.meta.filename) : doclet.meta.filename;
}

async function generate(file, title, docs, filename, _resoveLinks) {
  var html;
  var outpath;
  const resolveLinks = _resoveLinks !== false;

  const docData = {
    env: env,
    isTutorial: false,
    title: title,
    docs: docs,
    package: find({ kind: 'package' })[0]
  };

  outpath = path.join(outdir, filename);
  html = await view.render(file, docData);

  if (resolveLinks) {
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
  }

  util.writeFile(outpath, html, 'utf8');
}

function generateSourceFiles(sourceFiles, enc) {
  const sourceHtmls = [];
  const encoding = enc || 'utf8';
  Object.keys(sourceFiles).forEach(file => {
    var source;
    // links are keyed to the shortened path in each doclet's `meta.shortpath` property
    var sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened);
    helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

    try {
      source = {
        kind: 'source',
        code: helper.htmlsafe(fs.readFileSync(sourceFiles[file].resolved, encoding))
      };
    } catch (e) {
      logger.error('Error while generating source file %s: %s', file, e.message);
    }
    sourceHtmls.push({
      component: 'source',
      title: `Source: ${sourceFiles[file].shortened}`,
      docs: [source],
      url: sourceOutfile,
      resolveLink: false
    });
  });
  return sourceHtmls;
}

/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 *
 * @private
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
function attachModuleSymbols(doclets, modules) {
  var symbols = {};

  // build a lookup table
  doclets.forEach(symbol => {
    symbols[symbol.longname] = symbols[symbol.longname] || [];
    symbols[symbol.longname].push(symbol);
  });

  return modules.forEach(module => {
    if (symbols[module.longname]) {
      module.modules = symbols[module.longname]
        // Only show symbols that have a description. Make an exception for classes, because
        // we want to show the constructor-signature heading no matter what.
        .filter(symbol => {
          return symbol.description || symbol.kind === 'class';
        })
        .map(sym => {
          const symbol = doop(sym);

          if (symbol.kind === 'class' || symbol.kind === 'function') {
            symbol.name = `${symbol.name.replace('module:', '(require("')}"))`;
          }

          return symbol;
        });
    }
  });
}
function buildSubNavMembers(list) {
  return list.map(item => ({
    name: item.longname,
    link: linkto(item.longname, item.name)
  }));
}
/**
 * For lnb listing
 * -- 'Classes'
 * -- 'Namespaces'
 * @param obj
 */
function buildSubNav(obj) {
  var { longname } = obj;
  var members = find({
    kind: 'member',
    memberof: longname
  });
  var methods = find({
    kind: 'function',
    memberof: longname
  });
  var events = find({
    kind: 'event',
    memberof: longname
  });
  var typedef = find({
    kind: 'typedef',
    memberof: longname
  });
  var subnav = {
    members: buildSubNavMembers(members),
    methods: buildSubNavMembers(methods),
    events: buildSubNavMembers(events),
    typedef: buildSubNavMembers(typedef)
  };

  return subnav;
}

function buildMemberNav(items, itemsSeen, linktoFn) {
  return items.map(item => {
    var iteminfo = { longname: item.longname, id: `${item.longname.replace(/"/g, '_')}_sub` };
    iteminfo.children = buildSubNav(item);

    if (!hasOwnProp.call(item, 'longname')) {
      iteminfo.link = linktoFn('', item.name);
    } else if (!hasOwnProp.call(itemsSeen, item.longname)) {
      let displayName;
      if (env.conf.templates.default.useLongnameInNav || item.kind === 'namespace') {
        displayName = item.longname;
      } else {
        displayName = item.name;
      }
      iteminfo.link = linktoFn(item.longname, displayName.replace(/\b(module|event):/g, ''));
    }
    itemsSeen[item.longname] = true;
    return iteminfo;
  });
}

function linktoTutorial(longName, name) {
  return tutoriallink(name);
}

function linktoExternal(longName, name) {
  return linkto(longName, name.replace(/(^"|"$)/g, ''));
}
/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @param {array<object>} members.interfaces
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNav(members) {
  var nav = {
    useCollapsibles: env.conf.templates.useCollapsibles,
    members: {}
  };
  var seen = {};
  var seenTutorials = {};

  nav.members.tutorials = buildMemberNav(members.tutorials, seenTutorials, linktoTutorial, true);
  nav.members.modules = buildMemberNav(members.modules, {}, linkto);
  nav.members.externals = buildMemberNav(members.externals, seen, linktoExternal);
  nav.members.components = buildMemberNav(members.components, seen, linkto);
  nav.members.classes = buildMemberNav(members.classes, seen, linkto);
  nav.members.namespaces = buildMemberNav(members.namespaces, seen, linkto);
  nav.members.mixins = buildMemberNav(members.mixins, seen, linkto);
  nav.members.interfaces = buildMemberNav(members.interfaces, seen, linkto);

  if (members.globals.length) {
    var globalNav = [];
    var useGlobalTitleLink = true;

    members.globals.forEach(g => {
      if (!hasOwnProp.call(seen, g.longname)) {
        globalNav.push({
          kind: g.kind,
          link: linkto(g.longname, g.name)
        });

        if (g.kind !== 'typedef') {
          useGlobalTitleLink = false;
        }
      }
      seen[g.longname] = true;
    });
    nav.globals = globalNav;
    if (useGlobalTitleLink) {
      nav.globalTitleLink = linkto('global', 'Global');
    }
  }

  return nav;
}

/**
 * Look ma, it's cp -R.
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
function copyRecursiveSync(src, dest) {
  var srcExists = fs.existsSync(src);
  var stats = srcExists && fs.statSync(src);
  var isDirectory = srcExists && stats.isDirectory();

  if (srcExists) {
    if (isDirectory) {
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      var toDir = fs.toDir(dest);
      util.mkPath(toDir);
      util.copyFile(src, toDir, { originFS: fs });
    }
  }
}

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = async function publish(taffyData, opts, tutorials) {
  data = taffyData;
  var conf = env.conf.templates || {};
  const templateConf = env.conf['jsdoc-template-vue'];
  conf.default = conf.default || {};
  const templatePath = path.normalize(opts.template);
  // set up templating
  const layoutFile = conf.default.layoutFile ? path.getResourcePath(path.dirname(conf.default.layoutFile), path.basename(conf.default.layoutFile)) : path.join(templatePath, 'layout.html');
  view = new Template(
    layoutFile,
    templateConf.bundleFile ? path.getResourcePath(path.dirname(templateConf.bundleFile)) : path.join(templatePath, 'template/vue-ssr-server-bundle.json'),
    templateConf.manifestFile ? path.getResourcePath(path.dirname(templateConf.manifestFile)) : path.join(templatePath, 'template/vue-ssr-client-manifest.json')
  );
  // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
  // doesn't try to hand them out later
  var indexUrl = helper.getUniqueFilename('index');
  // don't call registerLink() on this one! 'index' is also a valid longname

  var globalUrl = helper.getUniqueFilename('global');
  helper.registerLink('global', globalUrl);

  // set up tutorials for helper
  helper.setTutorials(tutorials);

  data = helper.prune(data);
  data.sort('longname, version, since');
  helper.addEventListeners(data);

  var sourceFiles = {};
  var sourceFilePaths = [];
  data().each(doclet => {
    doclet.attribs = '';

    if (doclet.examples) {
      doclet.examples = doclet.examples.map(example => {
        var caption;
        var code;

        if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
          caption = RegExp.$1;
          code = RegExp.$3;
        }

        return {
          caption: caption || '',
          code: code || example
        };
      });
    }
    if (doclet.see) {
      doclet.see.forEach((seeItem, i) => {
        doclet.see[i] = hashToLink(doclet, seeItem);
      });
    }

    // build a list of source files
    var sourcePath;
    if (doclet.meta) {
      sourcePath = getPathFromDoclet(doclet);
      sourceFiles[sourcePath] = {
        resolved: sourcePath,
        shortened: null
      };
      if (sourceFilePaths.indexOf(sourcePath) === -1) {
        sourceFilePaths.push(sourcePath);
      }
    }
  });

  fs.mkPath(outdir);

  // copy user-specified static files to outdir
  var staticFilePaths;
  var staticFileFilter;
  var staticFileScanner;
  if (sourceFilePaths.length) {
    sourceFiles = shortenPaths(sourceFiles, path.commonPrefix(sourceFilePaths));
  }
  data().each(doclet => {
    var url = helper.createLink(doclet);
    helper.registerLink(doclet.longname, url);

    // add a shortened version of the full path
    var docletPath;
    if (doclet.meta) {
      docletPath = getPathFromDoclet(doclet);
      docletPath = sourceFiles[docletPath].shortened;
      if (docletPath) {
        doclet.meta.shortpath = docletPath;
      }
    }
  });

  data().each(doclet => {
    doclet.ancestors = getAncestorLinks(doclet);
    var url = helper.longnameToUrl[doclet.longname];

    if (url.indexOf('#') > -1) {
      doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
    } else {
      doclet.id = doclet.name;
    }
  });

  var members = getMembers(data);
  members.tutorials = tutorials.children;

  // output pretty-printed source files by default
  var outputSourceFiles = !!(conf.default && conf.default.outputSourceFiles !== false);

  attachModuleSymbols(find({ longname: { left: 'module:' } }), members.modules);

  // index page displays information from package.json
  var packages = find({ kind: 'package' });
  util.setup({ publicPath: outdir });
  // set up the lists that we'll use to generate pages
  var classes = taffy(members.classes);
  var modules = taffy(members.modules);
  var namespaces = taffy(members.namespaces);
  var mixins = taffy(members.mixins);
  var externals = taffy(members.externals);
  var interfaces = taffy(members.interfaces);
  var components = taffy(members.components);

  const nav = buildNav(members);
  function initView() {
    view.find = find;
    view.linkto = linkto;
    view.resolveAuthorLinks = resolveAuthorLinks;
    view.tutoriallink = tutoriallink;
    view.htmlsafe = htmlsafe;
    view.outputSourceFiles = outputSourceFiles;
    // once for all
    view.nav = nav;
  }
  function copyStaticFiles() {
    if (conf.default.staticFiles) {
      // The canonical property name is `include`. We accept `paths` for backwards compatibility
      // with a bug in JSDoc 3.2.x.
      staticFilePaths = conf.default.staticFiles.include || conf.default.staticFiles.paths || [];
      staticFileFilter = new Filter(conf.default.staticFiles);
      staticFileScanner = new Scanner();

      staticFilePaths.forEach(filePath => {
        var extraStaticFiles;
        const absoluteFilePath = path.resolve(env.pwd, filePath);
        extraStaticFiles = staticFileScanner.scan([absoluteFilePath], 10, staticFileFilter);

        extraStaticFiles.forEach(fileName => {
          var sourcePath = fs.toDir(absoluteFilePath);
          var toDir = fs.toDir(fileName.replace(sourcePath, outdir));
          util.mkPath(toDir);
          util.copyFile(fileName, toDir, { originFS: fs });
        });
      });
    }
  }

  let htmlFiles = [];
  if (outputSourceFiles) {
    htmlFiles = htmlFiles.concat(generateSourceFiles(sourceFiles, opts.encoding));
  }
  if (members.globals.length) {
    htmlFiles.push({
      component: 'global',
      title: 'Global',
      docs: [{ kind: 'globalobj' }],
      url: globalUrl
    });
  }
  htmlFiles.push({
    component: 'home',
    title: 'Home',
    docs: packages.concat([{ kind: 'mainpage', readme: opts.readme, longname: opts.mainpagetitle ? opts.mainpagetitle : 'Main Page' }]),
    url: indexUrl
  });
  // generate the pretty-printed source files first so other pages can link to them

  Object.keys(helper.longnameToUrl).forEach(longname => {
    var myModules = helper.find(modules, { longname: longname });
    if (myModules.length) {
      htmlFiles.push({
        component: 'module',
        title: `Module: ${myModules[0].name}`,
        docs: myModules,
        url: helper.longnameToUrl[longname]
      });
    }

    var myClasses = helper.find(classes, { longname: longname });
    if (myClasses.length) {
      htmlFiles.push({
        component: 'class',
        title: `Class: ${myClasses[0].name}`,
        docs: myClasses,
        url: helper.longnameToUrl[longname]
      });
    }

    var myNamespaces = helper.find(namespaces, { longname: longname });
    if (myNamespaces.length) {
      htmlFiles.push({
        component: 'namespace',
        title: `Namespace: ${myNamespaces[0].name}`,
        docs: myNamespaces,
        url: helper.longnameToUrl[longname]
      });
    }

    var myMixins = helper.find(mixins, { longname: longname });
    if (myMixins.length) {
      htmlFiles.push({
        component: 'mixin',
        title: `Mixin: ${myMixins[0].name}`,
        docs: myMixins,
        url: helper.longnameToUrl[longname]
      });
    }

    var myExternals = helper.find(externals, { longname: longname });
    if (myExternals.length) {
      htmlFiles.push({
        component: 'external',
        title: `External: ${myExternals[0].name}`,
        docs: myExternals,
        url: helper.longnameToUrl[longname]
      });
    }

    var myInterfaces = helper.find(interfaces, { longname: longname });
    if (myInterfaces.length) {
      htmlFiles.push({
        component: 'interface',
        title: `Interface: ${myInterfaces[0].name}`,
        docs: myInterfaces,
        url: helper.longnameToUrl[longname]
      });
    }
    var myComponents = helper.find(components, { longname: longname });
    if (myComponents.length) {
      htmlFiles.push({
        component: 'component',
        title: `Component: ${myComponents[0].name}`,
        docs: myComponents,
        url: helper.longnameToUrl[longname]
      });
    }
  });

  if (env.opts.tutorials) {
    copyRecursiveSync(env.opts.tutorials, `${outdir}/tutorials`);
  }

  // remove tutorials recurrency
  function normalizeTutorial(node) {
    if (node.parent) node.parent = { ...node.parent, children: null, _tutorials: null };
    node.children.forEach(normalizeTutorial);
  }
  normalizeTutorial(tutorials);
  // TODO: move the tutorial functions to templateHelper.js
  function generateTutorial(title, tutorial, fileName, originalFileName, isHtmlTutorial) {
    let tutorialContent;
    if (isHtmlTutorial) {
      //   _.extend(tutorialData, generateHtmlTutorialData(tutorial, fileName, originalFileName));
    } else {
      // yes, you can use {@link} in tutorials too!
      tutorialContent = helper.resolveLinks(tutorial.parse());
    }

    htmlFiles.push({
      component: 'tutorial',
      title: title,
      docs: packages.concat([{ kind: 'tutorial', isHtmlTutorial, children: tutorial.children, header: tutorial.title, content: tutorialContent }]),
      url: fileName
    });
  }

  // tutorials can have only one parent so there is no risk for loops
  function saveChildren(node) {
    node.children.forEach(async child => {
      var originalFileName = child.name;
      var isHtmlTutorial = child.type === tutorial.TYPES.HTML;
      var title = `Tutorial: ${child.title}`;
      var fileName = helper.tutorialToUrl(child.name);

      generateTutorial(title, child, fileName, originalFileName, isHtmlTutorial);
      saveChildren(child);
    });
  }
  saveChildren(tutorials);
  if (templateConf.server) {
    const cliService = new CLIService(templatePath);
    let initialize = false;
    util.setup({
      onmessage: async msg => {
        switch (msg.type) {
          case 'update':
            outdir = msg.outdir;
            if (msg.bundle && msg.manifest) {
              if (!initialize) {
                copyStaticFiles();
                initialize = true;
              }
              view = new Template(layoutFile, msg.bundle, msg.manifest);
              initView(view);
            }
            break;
          case 'request':
            {
              const filename = msg.url.replace(/^\//g, '') || 'index.html';
              const config = htmlFiles.find(config => config.url === filename);
              if (config) {
                await generate(config.component, config.title, config.docs, config.url, config.resolveLink);
              }
            }
            break;
          default:
            throw new Error(`unknow message type ${msg.type}: ${JSON.stringify(msg)}`);
        }
        return true;
      }
    });
    cliService.run('serve', {
      mode: 'dev',
      port: templateConf.port,
      host: templateConf.host
    });
  } else {
    initView(view);
    copyStaticFiles();
    // add template helpers
    // copy the template's static files to outdir
    var fromDir = path.join(templatePath, 'template');
    var staticFiles = fs.ls(path.join(fromDir, 'static'), 3);

    staticFiles.forEach(fileName => {
      var toDir = fs.toDir(fileName.replace(fromDir, outdir));
      util.mkPath(toDir);
      util.copyFile(fileName, toDir, { originFS: fs });
    });
    await Promise.all(htmlFiles.map(config => generate(config.component, config.title, config.docs, config.url, config.resolveLink)));
  }
};
