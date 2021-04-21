import { createApp } from './app';

// class RenderError extends Error {
//   constructor(errstring, code) {
//     super(errstring);
//     this.code = code;
//   }
// }
function getMatchedComponents(router, url) {
  return new Promise(resolve => {
    router.push(url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      //   if (!matchedComponents.length) {
      //     return reject(new RenderError(`can not found the corrspond page of ${url}`, 404));
      //   }
      resolve(matchedComponents);
    });
  });
}
export default async context => {
  const { app, router } = createApp(context.state, context.view);
  await getMatchedComponents(router, context.url);
  return app;
};
