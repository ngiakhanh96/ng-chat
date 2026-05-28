
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
    'index.csr.html': {size: 5395, hash: '6e087c4e3ff5529d854ff8e793c225a9eb5e8589d7227d52dbeb073e7e961916', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1073, hash: '54435c1df6334b3e7eef6777a4f0e727dd2b76806849715dfba2b95b059c7f89', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 13650, hash: '83324f28a24d3abbf4744bb7ef5ad9bc2cbf40539ce45da10393e31762e6bf5a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-P2JMIFK5.css': {size: 9252, hash: '6QbEMA1d0yo', text: () => import('./assets-chunks/styles-P2JMIFK5_css.mjs').then(m => m.default)}
  },
};
