'use strict';

import $ from 'jquery';

var config, storage;

config = {};

storage = {
  config,
  alias: {
    w: $(window),
    doc: $(document),
    body: $('body')
  }
};

export default storage;
