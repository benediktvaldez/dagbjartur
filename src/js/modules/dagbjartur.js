import $ from 'jquery';
import onLoad from 'onLoad';
import global from 'global';

onLoad(function() {
  global.setAttr('section', '');

  $('[section]').off('click.section').on('click.section', (event) => {
    var $el = $(event.currentTarget);
    var section = $el.attr('section');

    global.setAttr('section', section);

    if (section === '') {
      global.setAttr('article', '');
      $('ul[group]').removeClass('show');
    }

    event.preventDefault();
    return false;
  });
  $('a[href^="#group"]').off('click.group').on('click.group', (event) => {
    var $el = $(event.currentTarget);
    var group = $el.attr('group');
    var $ul = $('ul[group="' + group + '"]');

    if ($ul.hasClass('show')) {
      $ul.removeClass('show');
    } else {
      $('ul[group]').removeClass('show');
      $ul.addClass('show');
    }

    event.preventDefault();
    return false;
  });

  $('a[href^="#item"]').off('click.item').on('click.item', (event) => {
    var $el = $(event.currentTarget);
    var item = $el.attr('item');
    var group = $el.attr('group');

    global.setAttr('article', item);

    $('article[group="' + group + '"][item="' + item + '"]').addClass('show').siblings('article').removeClass('show');

    event.preventDefault();
    return false;
  });
});
