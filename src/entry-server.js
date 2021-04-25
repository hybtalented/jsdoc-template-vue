import { createApp } from './app';

class RenderError extends Error {
  constructor(errstring, code) {
    super(errstring);
    this.code = code;
  }
}
function getMatchedComponents(router, url) {
  return new Promise((resolve, reject) => {
    router.push(url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject(new RenderError(`can not found the corrspond page of ${url}`, 404));
      }
      resolve(matchedComponents);
    });
  });
}
export default async context => {
  const { app, router, store } = createApp(context.data, context.router);
  await getMatchedComponents(router, context.url);
  context.state = store.state;
  return app;
};
