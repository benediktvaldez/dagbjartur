define(['domReady', 'onLoad', 'jquery', 'router', 'keys'], function(domReady, onLoad, $, Router, keys) {
  'use strict';
  var router = new Router();
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

    router.navigate(event.currentTarget.pathname || $(event.currentTarget).attr('href'));

    if (event && event.currentTarget.tagName === 'A') {
      event.preventDefault();
      return false;
    }
  };

  domReady(function(){
    $(window).on('popstate', function(){
      router.navigate(window.location.pathname + window.location.search + window.location.hash);
    });
    $('header, sidebar, footer').find(selector).off('click.nav').on('click.nav', clickHandler);
  });

  onLoad(function(){
    $('pagewrap').find(selector).off('click.nav').on('click.nav', clickHandler);
  });
});
