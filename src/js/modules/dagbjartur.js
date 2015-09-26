import $ from 'jquery';
import onLoad from 'onLoad';
import global from 'global';

global.setAttr('load-state', 'post-load');

onLoad(function() {
  // domReady
  global.setAttr('load-state', 'intro');
  setTimeout(() => {
    global.setAttr('load-state', 'ready');
  },1000);

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
