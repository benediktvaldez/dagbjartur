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
      setTimeout(() => {
        $('ul[group]').removeClass('show');
      },750);
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
      $ul.parent().siblings('li').find('ul[group]').removeClass('show');
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

    $('article[group="' + group + '"][item="' + item + '"]').scrollTop(0).addClass('show').siblings('article').removeClass('show');

    global.setAttr('load-state', 'partial-loading');
    setTimeout(() => {
      global.setAttr('load-state', 'ready');
    },500);

    event.preventDefault();
    return false;
  });
});
