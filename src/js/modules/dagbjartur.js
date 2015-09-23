// import $ from 'jquery';
import onLoad from 'onLoad';
import global from 'global';

onLoad(function() {
  global.setAttr('section', '');

  $('[section]').off('click.section').on('click.section', (event) => {
    var $el = $(event.currentTarget);
    var section = $el.attr('section');

    global.setAttr('section', section);

    event.preventDefault();
    return false;
  });
});
