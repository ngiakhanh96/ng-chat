
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/externalRedirect"
  },
  {
    "renderMode": 2,
    "route": "/ng-app-shell"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5288, hash: 'e67a8ca83dfd51c0d9f61417b6b185bf3f0a70b7c2c81e09ef9489678862b3ad', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1073, hash: 'c367e78f4f5b2ccb95e8384de63552bab60a0c82ab675ca93542a4f5da98a719', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 13543, hash: '7b9958a70f1e6e6eace3005c68297b846d68f3a27f7484b18f7768f388b513e6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-DFOEYH5U.css': {size: 8764, hash: 'a3vj6YOgZz0', text: () => import('./assets-chunks/styles-DFOEYH5U_css.mjs').then(m => m.default)}
  },
};
