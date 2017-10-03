'use strict';

var fs = require('fs');

function JSONtransform(input) {
  this.input = input;

  if (typeof input === 'string') {
    this.input = JSON.parse(input);
  }

  this.computedTemplate = null;

  return this;
}

JSONtransform.prototype.transform = function (transformer) {
  return transformer.call(this);
};


JSONtransform.prototype.toString = function () {
  return this.computedTemplate;
};

JSONtransform.prototype.toFile = function (path) {
  return fs.writeFileSync(path, this.computedTemplate, 'utf-8');
};

JSONtransform.prototype.parse = function (parser) {
  return parser.call(this);
};

module.exports = JSONtransform;
