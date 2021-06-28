# jsdoc-template-vue

This is jsdoc template write by vue, the main UI part is base on [TUI JSDoc Template](https://www.npmjs.com/package/tui-jsdoc-template), while use [Vue server renderer](https://www.npmjs.com/package/vue-server-render)
as template render.

## INSTALL

```shell
npm install -D jsdoc-template-vue
```

## FEATURE

jsdoc-template-vue has the following features:

- Navigation:
  - AutoComplete Searchbox
  - Collapsible
  - Members / Methods / Events
  - Vue Components written by iview-typescript format
  - Grouped navigation for components, classes, namespaces, mixins
  - API / Examples (Tutorials) switcher
  - Resizable
  - mermaid support in markdown snippet，see [mermaid documentation](https://mermaid-js.github.io/mermaid/#/)
- Examples: HTML/JS source tab in example pages
- Typescript feature support: Generics Type

## Configuration

Here is an full example configuration of jsdoc

```js
{
  "$schema": "https://json.schemastore.org/jsdoc-1.0.0.json",
  "plugins": ["jsdoc-plugin-typescript-support", "jsdoc-template-vue/plugins/vue", "plugins/markdown", "plugins/summarize"],
  "source": {
    // include source files
    "include": ["types", "node_modules/view-design/types"],

    "includePattern": ".+\\.ts(doc|x)?$"
  },
  "opts": {
    "encoding": "utf8",
    "recurse": true,
    "package": "package.json",
    "readme": "README.md",
    "destination": "docker/docs",
    "template": "node_modules/jsdoc-template-vue",
    // include tutorial files
    "tutorials": "documentation/tutorials/"
  },
  "sourceType": "module",
  "templates": {
    "cleverLinks": true,
    "monospaceLinks": true,
    "default": {
      "outputSourceFiles": true,
      "includeDate": true,
      "staticFiles": {
        "include": ["documentation/static/"]
      }
    }
  },
  "jsdoc-template-vue": {
    // if server is enable, a devserver will be start after all doclet is parsed, instead of generate documentation files, this is only availiable for development enviroment
    "server": false,
    // the port for devserver
    "port": 8090,
    "host": "0.0.0.0",
    "css": ["styles/custom.css"],
    "appName": "新c端开发文档",
    "footerText": "新c端开发文档， 文档撰写：1. <a href=\"mailto:hybtalentd@163.com\">何友表</a>",
    // translations
    "translations": {
      "api": "接口",
      "tutorials?": "教程",
      "modules?": "模块",
      "class(es)?": "类",
      "interfaces?": "接口",
      "globals?": "全局属性",
      "methods?": "方法",
      "(type\\s+definition|typedef)s?": "类型定义",
      "members?": "成员变量",
      "props?": "属性",
      "components?": "组件",
      "events?": "事件",
      "extends": "继承",
      "fires?": "触发事件"
    },
    // allow group documentaions for components, classes, namespaces, mixins, interfaces
    "groups": {
      "components": {
        "IView 组件": "doc=>doc.meta.shortpath.startsWith('node_modules/view-design')"
      },
      "interfaces": {
        "外部服务调用": "doc=>doc.meta.shortpath.startsWith('types/services')"
      }
    }
  },
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc", "closure"]
  },
  "recurseDepth": 10
}
```

## DEVELOPEMENT

### Compiles and hot-reloads for development

Enable jsdoc-template-vue.server options, and then run `jsdoc -c yourjsdocconf.jsdoc`, a hot-reloads server will be start after all documentaion are parsed;

### Compiles and minifies for production for both client and server bundle

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
