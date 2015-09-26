define(['domReady', 'onLoad', 'jquery', 'router', 'keys'], function(domReady, onLoad, $, router, keys) {
  'use strict';
  if (!router.supported) { return; }

  var selector = 'a';
  selector += ':not([href^="javascript:"])';
  selector += ':not([target])';
  selector += ':not([lang])';
  selector += ':not([modal])';
  selector += ':not([href^=mailto])';
  selector += ':not([href^=tel])';
  selector += ':not([href^=http])';
  selector += ':not([href^=#])';

  var clickHandler = function(event) {
    if (keys.isClickModifier(event)) { return; }

    router.navigate(event.currentTarget);

    event.preventDefault();
    return false;
  };

  onLoad(function(){
    $('body').find(selector).off('click.nav').on('click.nav', clickHandler);
  });
});
