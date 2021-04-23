var doop = require('jsdoc/util/doop');
var env = require('jsdoc/env');
var fs = require('jsdoc/fs');
var helper = require('jsdoc/util/templateHelper');
var logger = require('jsdoc/util/logger');
var path = require('jsdoc/path');
var { taffy } = require('taffydb');
var tutorial = require('jsdoc/tutorial');
var util = require('util');
var _ = require('underscore');
const { Filter } = require('jsdoc/src/filter');
const { Scanner } = require('jsdoc/src/scanner');
var template = require('./template');

var { htmlsafe } = helper;
var { linkto } = helper;
var { resolveAuthorLinks } = helper;
var hasOwnProp = Object.prototype.hasOwnProperty;

var data;
var view;

var outdir = path.normalize(env.opts.destination);

env.conf.templates = _.extend(
  {
    useCollapsibles: true
  },
  env.conf.templates
);

env.conf.templates.tabNames = _.extend(
  {
    api: 'API',
    tutorials: 'Examples'
  },
  env.conf.templates.tabNames
);

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

function needsSignature(doclet) {
  var needsSig = false;

  // function and class definitions always get a signature
  if (doclet.kind === 'function' || doclet.kind === 'class') {
    needsSig = true;
  }
  // typedefs that contain functions get a signature, too
  else if (doclet.kind === 'typedef' && doclet.type && doclet.type.names && doclet.type.names.length) {
    for (var i = 0, l = doclet.type.names.length; i < l; i++) {
      if (doclet.type.names[i].toLowerCase() === 'function') {
        needsSig = true;
        break;
      }
    }
  }

  return needsSig;
}

function getSignatureAttributes(item) {
  var attributes = [];

  if (item.optional) {
    attributes.push('opt');
  }

  if (item.nullable === true) {
    attributes.push('nullable');
  } else if (item.nullable === false) {
    attributes.push('non-null');
  }

  return attributes;
}

function updateItemName(item) {
  var attributes = getSignatureAttributes(item);
  var itemName = item.name || '';

  if (item.variable) {
    itemName = `&hellip;${itemName}`;
  }

  if (attributes && attributes.length) {
    itemName = util.format('%s<span class="signature-attributes">%s</span>', itemName, attributes.join(', '));
  }

  return itemName;
}

function addParamAttributes(params) {
  return params
    .filter(function(param) {
      return param.name && param.name.indexOf('.') === -1;
    })
    .map(updateItemName);
}

function buildItemTypeStrings(item) {
  var types = [];

  if (item && item.type && item.type.names) {
    item.type.names.forEach(function(name) {
      types.push(linkto(name, htmlsafe(name)));
    });
  }

  return types;
}

function buildAttribsString(attribs) {
  var attribsString = '';

  if (attribs && attribs.length) {
    attribsString = util.format('<span class="icon green">%s</span> ', attribs.join('</span>, <span class="icon green">'));
  }

  return attribsString;
}

function addNonParamAttributes(items) {
  var types = [];

  items.forEach(function(item) {
    types = types.concat(buildItemTypeStrings(item));
  });

  return types;
}

function addSignatureParams(f) {
  var params = f.params ? addParamAttributes(f.params) : [];

  f.signature = util.format('%s(%s)', f.signature || '', params.join(', '));
}

function addSignatureReturns(f) {
  var attribs = [];
  var attribsString = '';
  var returnTypes = [];
  var returnTypesString = '';
  var source = f.yields || f.returns;

  // jam all the return-type attributes into an array. this could create odd results (for example,
  // if there are both nullable and non-nullable return types), but let's assume that most people
  // who use multiple @return tags aren't using Closure Compiler type annotations, and vice-versa.
  if (source) {
    source.forEach(item => {
      helper.getAttribs(item).forEach(function(attrib) {
        if (attribs.indexOf(attrib) === -1) {
          attribs.push(attrib);
        }
      });
    });

    attribsString = buildAttribsString(attribs);
  }

  if (source) {
    returnTypes = addNonParamAttributes(f.returns);
  }
  if (returnTypes.length) {
    returnTypesString = util.format(' &rarr; %s{%s}', attribsString, returnTypes.join('|'));
  }

  f.signature = `<span class="signature">${f.signature || ''}</span>` + `<span class="type-signature">${returnTypesString}</span>`;
}

function addSignatureTypes(f) {
  var types = f.type ? buildItemTypeStrings(f) : [];

  f.signature = `${f.signature || ''}<span class="type-signature">${types.length ? ` :${types.join('|')}` : ''}</span>`;
}

function addAttribs(f) {
  var attribs = helper.getAttribs(f);
  var attribsString = buildAttribsString(attribs);

  f.attribs = util.format('<span class="type-signature">%s</span>', attribsString);
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
  var docData;
  var html;
  var outpath;
  const resolveLinks = _resoveLinks !== false;

  docData = {
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

  fs.writeFileSync(outpath, html, 'utf8');
}

async function generateSourceFiles(sourceFiles, enc) {
  const encoding = enc || 'utf8';
  await Promise.all(
    Object.keys(sourceFiles).map(async file => {
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

      await generate('source', `Source: ${sourceFiles[file].shortened}`, [source], sourceOutfile, false);
    })
  );
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
var copyRecursiveSync = function(src, dest) {
  var contents;
  var srcExists = fs.existsSync(src);
  var destExists = fs.existsSync(dest);
  var stats = srcExists && fs.statSync(src);
  var isDirectory = srcExists && stats.isDirectory();

  if (srcExists) {
    if (isDirectory) {
      if (!destExists) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      contents = fs.readFileSync(src);
      fs.writeFileSync(dest, contents);
    }
  }
};

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = async function publish(taffyData, opts, tutorials) {
  data = taffyData;

  var conf = env.conf.templates || {};
  conf.default = conf.default || {};

  var templatePath = path.normalize(opts.template);
  // set up templating

  view = new template.Template(
    conf.default.layoutFile ? path.getResourcePath(path.dirname(conf.default.layoutFile), path.basename(conf.default.layoutFile)) : path.join(templatePath, 'template/vue-ssr-server-bundle.json')
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

  // copy the template's static files to outdir
  var fromDir = path.join(templatePath, 'static');
  var staticFiles = fs.ls(fromDir, 3);

  staticFiles.forEach(fileName => {
    var toDir = fs.toDir(fileName.replace(fromDir, outdir));
    fs.mkPath(toDir);
    fs.copyFileSync(fileName, toDir);
  });

  // copy user-specified static files to outdir
  var staticFilePaths;
  var staticFileFilter;
  var staticFileScanner;
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
        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
      });
    });
  }

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

  data().each(function(doclet) {
    var url = helper.longnameToUrl[doclet.longname];

    if (url.indexOf('#') > -1) {
      doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
    } else {
      doclet.id = doclet.name;
    }

    if (needsSignature(doclet)) {
      addSignatureParams(doclet);
      addSignatureReturns(doclet);
      addAttribs(doclet);
    }
  });

  // do this after the urls have all been generated
  data().each(doclet => {
    doclet.ancestors = getAncestorLinks(doclet);

    if (doclet.kind === 'member') {
      addSignatureTypes(doclet);
      addAttribs(doclet);
    }

    if (doclet.kind === 'constant') {
      addSignatureTypes(doclet);
      addAttribs(doclet);
      doclet.kind = 'member';
    }
  });

  var members = helper.getMembers(data);

  members.tutorials = tutorials.children;

  // output pretty-printed source files by default
  var outputSourceFiles = !!(conf.default && conf.default.outputSourceFiles !== false);

  // add template helpers
  view.find = find;
  view.linkto = linkto;
  view.resolveAuthorLinks = resolveAuthorLinks;
  view.tutoriallink = tutoriallink;
  view.htmlsafe = htmlsafe;
  view.outputSourceFiles = outputSourceFiles;
  // once for all
  view.nav = buildNav(members);

  attachModuleSymbols(find({ longname: { left: 'module:' } }), members.modules);

  // generate the pretty-printed source files first so other pages can link to them
  if (outputSourceFiles) {
    await generateSourceFiles(sourceFiles, opts.encoding);
  }

  if (members.globals.length) {
    await generate('global', 'Global', [{ kind: 'globalobj' }], globalUrl);
  }

  // index page displays information from package.json
  var packages = find({ kind: 'package' });

  await generate('home', 'Home', packages.concat([{ kind: 'mainpage', readme: opts.readme, longname: opts.mainpagetitle ? opts.mainpagetitle : 'Main Page' }]), indexUrl);

  // set up the lists that we'll use to generate pages
  var classes = taffy(members.classes);
  var modules = taffy(members.modules);
  var namespaces = taffy(members.namespaces);
  var mixins = taffy(members.mixins);
  var externals = taffy(members.externals);
  var interfaces = taffy(members.interfaces);

  await Promise.all(
    Object.keys(helper.longnameToUrl).map(async longname => {
      var myModules = helper.find(modules, { longname: longname });
      if (myModules.length) {
        await generate('module', `Module: ${myModules[0].name}`, myModules, helper.longnameToUrl[longname]);
      }

      var myClasses = helper.find(classes, { longname: longname });
      if (myClasses.length) {
        await generate('class', `Class: ${myClasses[0].name}`, myClasses, helper.longnameToUrl[longname]);
      }

      var myNamespaces = helper.find(namespaces, { longname: longname });
      if (myNamespaces.length) {
        await generate('namespace', `Namespace: ${myNamespaces[0].name}`, myNamespaces, helper.longnameToUrl[longname]);
      }

      var myMixins = helper.find(mixins, { longname: longname });
      if (myMixins.length) {
        await generate('mixin', `Mixin: ${myMixins[0].name}`, myMixins, helper.longnameToUrl[longname]);
      }

      var myExternals = helper.find(externals, { longname: longname });
      if (myExternals.length) {
        await generate('external', `External: ${myExternals[0].name}`, myExternals, helper.longnameToUrl[longname]);
      }

      var myInterfaces = helper.find(interfaces, { longname: longname });
      if (myInterfaces.length) {
        await generate('interface', `Interface: ${myInterfaces[0].name}`, myInterfaces, helper.longnameToUrl[longname]);
      }
    })
  );

  if (env.opts.tutorials) {
    copyRecursiveSync(env.opts.tutorials, `${outdir}/tutorials`);
  }
  function generateHtmlTutorialData(tutorial, filename, originalFileName) {
    return {
      codeHtml: htmlsafe($('div.code-html').html() || ''),
      codeJs: htmlsafe($('script.code-js').html() || ''),
      originalFileName: originalFileName
    };
  }
  // TODO: move the tutorial functions to templateHelper.js
  async function generateTutorial(title, tutorial, fileName, originalFileName, isHtmlTutorial) {
    var tutorialData = {
      docs: null, // If there is no "docs" prop, Erros in layout.tmpl. (For left-nav member listing control)
      isTutorial: true,
      env: env,
      title: title,
      header: tutorial.title,
      children: tutorial.children,
      isHtmlTutorial: isHtmlTutorial,
      package: find({ kind: 'package' })[0]
    };

    if (isHtmlTutorial) {
      _.extend(tutorialData, generateHtmlTutorialData(tutorial, fileName, originalFileName));
    } else {
      tutorialData.content = tutorial.parse();
    }

    var tutorialPath = path.join(outdir, fileName);
    var html = await view.render('tutorial', tutorialData);

    // yes, you can use {@link} in tutorials too!
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

    fs.writeFileSync(tutorialPath, html, 'utf8');
  }

  // tutorials can have only one parent so there is no risk for loops
  async function saveChildren(node) {
    await Promise.all(
      node.children.map(async child => {
        var originalFileName = child.name;
        var isHtmlTutorial = child.type === tutorial.TYPES.HTML;
        var title = `Tutorial: ${child.title}`;
        var fileName = helper.tutorialToUrl(child.name);

        await generateTutorial(title, child, fileName, originalFileName, isHtmlTutorial);
        await saveChildren(child);
      })
    );
  }
  await saveChildren(tutorials);
};
