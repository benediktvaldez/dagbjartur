import $ from 'jquery';
import _ from 'underscore';

let Requests = class {

  constructor() {
    this.active = {};
    this.skip = [];
  }

  flush(tag) {
    if (this.tagExists(tag)) {
      this.active[tag].abort();
      this.active = _.omit(this.active, tag);
    } else if (!tag && tag !== '') {
      $.each(this.active, (index, value) => {
        if (this.skip.indexOf(index) < 0) {
          value.abort();
        }
      });
      this.active = {};
    }
  }

  ajax(options, tag, dontFlushMe) {
    var deferrer = $.Deferred();
    var result = {
      tag: _.uniqueId((tag || 'get') + '_'),
      promise: deferrer.promise(),
    };
    if (!options.url) {
      deferrer.reject({error: 'no url'});
    } else {
      if (dontFlushMe) {
        this.skip.push(result.tag);
      }
      this.active[result.tag] = $.ajax(options)
        .always((response, status) => {
          this.active = _.omit(this.active, result.tag);
          var res = {
            tag: result.tag,
            response: response,
            status: status,
          };
          if (status !== 'success') {
            deferrer.reject(res);
          } else {
            deferrer.resolve(res);
          }
        });
    }
    return result;
  }

  raw(options, tag, dontFlushMe) {
    return this.ajax(options, tag, dontFlushMe);
  }

  get(url, tag, dontFlushMe) {
    return this.ajax({
      type: 'GET',
      url: url
    }, tag, dontFlushMe);
  }

  post(url, params, tag, dontFlushMe) {
    return this.ajax({
      type: 'POST',
      url: url,
      data: params
    }, tag, dontFlushMe);
  }

  tagExists(tag) {
    return tag && this.active.hasOwnProperty(tag);
  }
};

export default new Requests();
