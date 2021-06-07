/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

function createInteractionHandler() {
  const interactionHandler = {};
  let onmessage = null;
  interactionHandler.fs = fs;
  interactionHandler.sendMessage = msg => {
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
      if (typeof interactionHandler.fs.readFileSync === 'function') {
        return interactionHandler.fs.readFileSync(file, 'utf-8');
      } else {
        return fs.readFileSync(file, 'utf-8');
      }
    } catch (e) {
      return null;
    }
  };
  interactionHandler.mkPath = pathName => {
    if (typeof interactionHandler.fs.mkdirpSync === 'function') {
      return interactionHandler.fs.mkdirpSync(pathName);
    } else {
      return mkdirp.sync(pathName);
    }
  };
  interactionHandler.copyFile = (inFile, outDir = '', { originFS = interactionHandler.fs, fileName }) => {
    const outFileName = fileName || path.basename(inFile);
    const outFile = path.join(outDir, outFileName);
    if (originFS === interactionHandler.fs) {
      if (typeof interactionHandler.fs.copyFileSync === 'function') {
        return interactionHandler.fs.copyFileSync(inFile, outFile);
      } else {
        return fs.copyFileSync(inFile, outFile);
      }
    } else {
      const content = originFS.readFileSync(inFile);
      interactionHandler.writeFile(outFile, content, { encoding: null });
    }
  };
  interactionHandler.writeFile = (file, content, options = 'utf-8') => {
    if (typeof interactionHandler.fs.writeFileSync === 'function') {
      return interactionHandler.fs.writeFileSync(file, content, options);
    } else {
      return fs.writeFileSync(file, content, options);
    }
  };

  interactionHandler.setup = opts => {
    if (opts.fs) {
      interactionHandler.fs = opts.fs;
    }
    if (typeof opts.onmessage === 'function') {
      onmessage = opts.onmessage;
    }
  };
  return interactionHandler;
}

module.exports = global.__ssrPluginInterface || (global.__ssrPluginInterface = createInteractionHandler());
