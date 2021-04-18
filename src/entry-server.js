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
export default context => {
  return async () => {
    const { app, router, store } = createApp();
    const matchedComponents = await getMatchedComponents(router, context.url);
    await Promise.all(
      matchedComponents.map(Component => {
        if (Component.asyncData) {
          Component.asyncData({ store, route: router.currentRoute });
        }
        return 'ok';
      })
    );
    context.state = store.state;
    return app;
  };
};
