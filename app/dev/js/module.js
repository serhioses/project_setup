'use strict';

import storage from './storage';

import $ from 'jquery';
import eclipse from 'eclipse';

let modulesNames = {};

export default class Module {
  constructor(name) {
    if (typeof name !== 'string' || !name.length) {
      throw new TypeError('name is required and must not be an empty string');
    }
    
    if (modulesNames.hasOwnProperty(name)) {
      throw new ReferenceError(`<${name}> module is already defined`);
    }

    this.name = name;
    this.state = {};

    modulesNames[name] = 1;
  }
  extend(extender) {
    if (eclipse.helpers.getClass(extender) === 'Object') {
      $.extend(true, this.state, extender);
    }
  }
  get config() {
    return storage.config;
  }
  get alias() {
    return storage.alias;
  }
}
