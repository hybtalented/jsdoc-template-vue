# jsdoc-template-vue

This is jsdoc template write by vue, the main UI part is base on [TUI JSDoc Template](https://www.npmjs.com/package/tui-jsdoc-template), and template renderer is rewrite by [Vue server renderer](https://www.npmjs.com/package/vue-server-render)

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
  - API / Examples (Tutorials) switcher
  - Resizable
- Examples: HTML/JS source tab in example pages
- Typescript feature support: Generics Type

## Configuration

The configuration of jsdoc-template-vue looks like
```js
{
  "$schema": "https://json.schemastore.org/jsdoc-1.0.0.json",
  "jsdoc-template-vue" : {
    "css": [
      "styles/custom.css"
    ],
    "appName": "documention title",
    "footerText": "the footertext of the generated html",
    "translations": { // translations
      "api": "translation of api",
      "tutorials": "translation of tutorials"
    }
  }
}
```

## DEVELOPEMENT

### Compiles and hot-reloads for development

```
npm run serve
```


### generate client manafest file

```
npm run build-client
```

### gerate server bundle file to generate html template

```
npm run build-server
```
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
