/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function createInteractionHandler() {
  const interactionHandler = {};
  let publicPath;
  let onmessage = null;
  interactionHandler.sendMessage = msg => {
    console.info('on message ', msg);
    return new Promise(resolve => {
      const finishHandler = result => {
        console.info('sendMessage finish with result', result);
        resolve(true, result);
      };
      const errHander = err => {
        console.error('sendMessage with error ', err);
        resolve(false, err);
      };
      if (typeof onmessage === 'function') {
        try {
          const result = onmessage(msg);
          if (Object.prototype.toString.call(result) === '[object Promise]') {
            result.then(finishHandler).catch(errHander);
          } else {
            finishHandler(result);
          }
        } catch (ex) {
          errHander(ex);
        }
      } else {
        finishHandler(false);
      }
    });
  };
  interactionHandler.readFile = file => {
    try {
      const fullpath = path.join(publicPath, file);
      if (typeof interactionHandler.fs.readFileSync === 'function') {
        return interactionHandler.fs.readFileSync(fullpath, 'utf-8');
      } else {
        return fs.readFileSync(fullpath, 'utf-8');
      }
    } catch (e) {
      return null;
    }
  };
  interactionHandler.writeFile = (file, content) => {
    try {
      const fullpath = path.join(publicPath, file);
      if (typeof interactionHandler.fs.writeFile === 'function') {
        return interactionHandler.fs.writeFileSync(fullpath, content, 'utf-8');
      } else {
        return fs.writeFileSync(fullpath, content, 'utf-8');
      }
    } catch (e) {
      return null;
    }
  };

  interactionHandler.setup = opts => {
    if (opts.fs) {
      interactionHandler.fs = opts.fs;
    }
    if (typeof opts.publicPath === 'string') {
      publicPath = opts.publicPath;
    }
    if (typeof opts.onmessage === 'function') {
      onmessage = opts.onmessage;
    }
  };
  return interactionHandler;
}

module.exports = global.__ssrPluginInterface || (global.__ssrPluginInterface = createInteractionHandler());
