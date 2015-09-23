'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    jquery: 'vendor/jquery',
    domReady: 'vendor/domReady',
    underscore: 'vendor/underscore',

    onLoad: 'modules/onLoad',
    keys: 'modules/keys',
    req: 'modules/requests',
    router: 'modules/router',
    global: 'modules/global',
    analytics: 'modules/analytics',

    // Scripts
    initsite: 'modules/init-site',
    dagbjartur: 'modules/dagbjartur',
  }
});

require([
  'initsite',
  'dagbjartur',
]);
