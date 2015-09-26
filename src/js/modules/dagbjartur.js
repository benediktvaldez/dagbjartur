import $ from 'jquery';
import onLoad from 'onLoad';
import global from 'global';

global.setAttr('load-state', 'post-load');

onLoad(function() {
  $('a[href^="http"]').attr('target', '_blank');

  global.setAttr('load-state', 'intro');
  setTimeout(() => {
    global.setAttr('load-state', 'ready');
  },1000);

  $(document).on('partial-loading', function(){
    global.setAttr('load-state', 'partial-loading');
  });
  $(document).on('partial-loaded loaded', function(){
    global.setAttr('load-state', 'ready');
  });
});
