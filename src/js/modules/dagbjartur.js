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

  $('a[href^="#group"').off('click.group').on('click.group', (event) => {
    var $el = $(event.currentTarget);
    var group = $el.attr('group');

    $('ul[group="' + group + '"]').toggleClass('show');

    event.preventDefault();
    return false;
  });
});
