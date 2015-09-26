// import keys from 'keys';
// import format from 'modules/format';
import global from 'global';
import analytics from 'analytics';
import historySupported from 'support/history';

let Router = class {
  constructor() {
    this.supported = historySupported;

    this.state = {
      title: null,
      state: window.history.state || null,
      path: window.location.pathname || '',
      navigating: false,
      last: '',
    };

    this.setState('path', this.state.path);
    this.setState('section', '');
    this.setState('article', '');

    this.processPath();

    window.onpopstate = () => {
      this.processPath(window.location.pathname);
    };
  }

  processPath(path) {
    path = path || this.state.path;
    let split = path.split('/');

    if (split.length < 1)  { return; }

    $.each(split, (index, val) => {
      if (index === 1 && val) {
      this.setState('section', val);
      } else if (index > 1 && val) {
        let $isItem = this.isItem(val);
        if ($isItem) {
          let item = $isItem.attr('item');
          let group = $isItem.attr('group');

          this.setState('article', item);

          $('a[is="item"][item!="' + item + '"]').attr('active', false);
          $('a[is="item"][item="' + item + '"]').attr('active', true);

          $('article[group="' + group + '"][item="' + item + '"]')
              .scrollTop(0)
              .addClass('show')
            .siblings('article')
              .removeClass('show');
        } else {
          let $ul = $('ul[group="' + val + '"]');
          $ul.parent().siblings('li')
            .find('ul[group]').removeClass('show');
          $ul.addClass('show');
        }
      }
    });
  }

  isItem(name) {
    var $item = $('a[item="' + name + '"]');
    return $item.length !== 0 ? $item : false;
  }

  pushState(state, title, path) {
    state = state || this.state.state;
    title = title || this.state.title;
    path = path || this.state.path;
    window.history.pushState(state, title, path);

    analytics('send', 'pageview', {
      page: analytics.cleanUrl(path),
      title: title,
    });
  }

  replaceState(state, title, path) {
    state = state || this.state.state;
    title = title || this.state.title;
    path = path || this.state.path;
    window.history.replaceState(state, title, path);
  }

  setState(key, value) {
    this.state[key] = value;
    global.setAttr(key, value);
  }

  hardNavigate(path) {
    window.location.href = path;
  }

  navigate(target) {
    this.actOnType(target);
    var newpath = target.pathname || $(target).attr('href');
    this.setState('last', this.state.path);
    this.setState('path', newpath);
    this.pushState();

    $(document).trigger('partial-loading');
    setTimeout(() => $(document).trigger('partial-loaded') ,300);
  }

  actOnType(target) {
    let $target = $(target);
    let type = $target.attr('is') || 'link';

    if (type === 'item') {
      let item = $target.attr('item');
      let group = $target.attr('group');
      this.setState('article', item);

      $('a[is="item"][item!="' + item + '"]').attr('active', false);
      $('a[is="item"][item="' + item + '"]').attr('active', true);

      $('article[group="' + group + '"][item="' + item + '"]')
          .scrollTop(0)
          .addClass('show')
        .siblings('article')
          .removeClass('show');
    } else if (type === 'group') {
      let group = $target.attr('group');
      let $ul = $('ul[group="' + group + '"]');

      this.setState('article', '');

      $ul.parent().siblings('li')
        .find('ul[group]').removeClass('show');
      $ul.addClass('show');
    } else if (type === 'section') {
      let section = $target.attr('section');

      this.setState('section', section);

      if (section === '') {
        this.setState('article', '');
        setTimeout(() => {
          $('ul[group]').removeClass('show');
        },750);
      }
    }
  }
};

export default new Router();
