import $ from 'jquery';
import onLoad from 'onLoad';
import global from 'global';

global.setAttr('load-state', 'post-load');

onLoad(function() {
  // domReady
  global.setAttr('load-state', 'ready');

  $(document).on('ajax-loading', function(){
    global.setAttr('load-state', 'ajax-loading');
  });
  $(document).on('ajax-loaded loaded', function(){
    global.setAttr('load-state', 'ready');
  });
}, function() {
  // on ajax-loaded
  global.setAttr('load-state', 'ajax-loaded');
});
