import req from 'req';
import keys from 'keys';
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
  }

  pushState(state, title, path) {
    state = state || this.state.state;
    title = title || this.state.title;
    path = path || this.state.path;
    window.history.pushState(state, title, path);
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

  clickHandler(event) {
    if (keys.isClickModifier(event)) { return; }

    this.navigate();

    if (event && event.target.tagName === 'A') {
      event.preventDefault();
      return false;
    }
  }

  hardNavigate(path) {
    window.location.href = path;
  }

  navigate(newpath) {
    this.setState('last', this.state.path);
    this.setState('path', newpath);
    this.pushState();
    req.flush();

    this.setState('navigating', true);

    $(document).trigger('ajax-loading');
    let res = req.get(this.state.path, 'router');

    $.when( res.promise ).done((data) => {
      $('html,body').stop().animate({ scrollTop: 0 }, 200);
      this.success(data.response);
    }).fail((data) => {
      if (data.status !== 'abort') {
        console.warn('Navigation failed', data);
        this.fail(data.response);
      }
    });
  }

  success(response) {
    this.buildPage(response);
    this.setState('navigating', false);

    analytics('send', 'pageview', {
      page: analytics.cleanUrl(this.state.path),
      title: $(response).filter('title').text(),
    });
  }

  fail(response) {
    response = response || { status: 0 };

    if (response.status > 499) {
      this.hardNavigate('http://kolibri.is/500');
    } else if (response.status > 499) {
      this.navigate('/404.html');
    } else {
      this.hardNavigate(this.state.path);
    }
  }

  buildPage(response) {
    let $response = $(response);

    if ($response.filter('pagewrap').length < 1) {
      this.navigate('/404.html');
    } else {
      document.title = $response.filter('title').text();

      let $pagewrap = $('pagewrap');
      if ($pagewrap.length <= 0) {
        $('header').after($('<pagewrap />'));
      }
      if ($pagewrap.find('main').length <= 0) {
        $pagewrap.append($('<main />'));
      }
      $pagewrap.find('main').replaceWith($response.find('main'));

      $(document).trigger('ajax-loaded');
    }
  }

};

export default Router;
