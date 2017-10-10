## module-json-transform

> Transform any JSON into any language/template

## Statistics

[![Github All Releases](https://img.shields.io/github/downloads/brickifyjs/module-json-transform/total.svg?style=flat-square)](https://github.com/brickifyjs/module-json-transform)
[![npm](https://img.shields.io/npm/dt/@brickify/m-jt.svg?style=flat-square)](https://www.npmjs.com/package/@brickify/m-jt)

## Social
[![GitHub forks](https://img.shields.io/github/forks/brickifyjs/module-json-transform.svg?label=Fork&style=flat-square)](https://github.com/brickifyjs/module-json-transform)
[![GitHub stars](https://img.shields.io/github/stars/brickifyjs/module-json-transform.svg?label=Stars&style=flat-square)](https://github.com/brickifyjs/module-json-transform)
[![GitHub watchers](https://img.shields.io/github/watchers/brickifyjs/module-json-transform.svg?label=Watch&style=flat-square)](https://github.com/brickifyjs/module-json-transform)
[![Gitter](https://img.shields.io/gitter/room/brickifyjs/module-json-transform.svg?style=flat-square)](https://gitter.im/brickifyjs/module-json-transform)

## Project Health

[![Travis branch](https://img.shields.io/travis/brickifyjs/module-json-transform/master.svg?style=flat-square)](https://travis-ci.org/brickifyjs/module-json-transform)
[![Codecov](https://img.shields.io/codecov/c/github/brickifyjs/module-json-transform.svg?style=flat-square)](https://codecov.io/gh/brickifyjs/module-json-transform)
[![bitHound](https://img.shields.io/bithound/dependencies/github/brickifyjs/module-json-transform.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-json-transform/master/dependencies/npm)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/brickifyjs/module-json-transform.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-json-transform/master/dependencies/npm)
[![Website](https://img.shields.io/website/https/m-jt.js.brickify.io.svg?label=website&style=flat-square)](https://m-jt.js.brickify.io)

## Install

```bash
$ npm install @brickskit/m-jt
```


## Usage

```js

// Require module
var JSONtransform = require('@brickskit/m-jt');

// Define your JSON to be transformed
var json = 
[
 {
   'repository': 'https://github.com/brickskit/module-json-transform',
   'package': '@brickskit/m-jt',
   'title': 'JSON Transform',
   'desc': 'Transform any JSON into any langage/template',
   'topics': [
     'JAVASCRIPT',
     'JSON',
     'TRANSFORM'
   ]
 },
 {
   'repository': 'URL',
   'package': 'PACKAGE_NAME',
   'title': 'PROJECT TITLE',
   'desc': 'PROJECT DESCRIPTION',
   'topics': [
     'JAVASCRIPT'
   ]
 }
];

// Define your parser
var parser = function () {
  var topics = this.input.map(function (entry) {
    return entry.topics;
  });

  this.topics = [].concat.apply([], topics).reduce(function (prev, current) {
    var prev0 = prev;
    if (prev.indexOf(current) === -1) {
      prev0 = prev.concat(current);
    }

    return prev0;
  }, []);

  return this;
};


var template = function () {
  var that = this;
  var str = '# TABLE OF CONTENT\n';

  var toc = this.topics.map(function (topic) {
    return '* [' + topic.toUpperCase() + '](#' + topic + ')\n';
  });

  str += toc.join('');

  var sections = this.topics.map(function (topic) {
    return '\n# ' + topic.toUpperCase() + ' \n'
      + '| TITLE | DESCRIPTION | NPM | GITHUB | \n'
      + '| ----- | ----------- | --- | ------ |\n'

      + that.input.filter(function (entry) {
        var result = false;
        if (entry.topics.indexOf(topic) > -1) {
          result = true;
        }
        return result;
      }).map(function (entry) {
        return '| ' + entry.title + ' | ' + entry.desc + ' | ' + (entry.package && ('[' + entry.package + '](http://www.npmjs.com/package/' + entry.package + ')')) + ' | [' + entry.title + '](' + entry.repository + ')  |';
      }).join('\n')
      + '\n';
  });

  str += sections.join('');

  this.computedTemplate = str;

  return this;
};

new JSONtransform(json) // Instantiate
.parse(parser) // Parse json in order to export topics
.transform(template) // Transform json to markdown
.toString(); // Export to string   
```


## Extend

```js

// Create your own parsing method
JSONtransform.prototype.parseTopics = function () {
  var topics = this.input.map(function (entry) {
    return entry.topics;
  });

  this.topics = [].concat.apply([], topics).reduce(function (prev, current) {
    var prev0 = prev;
    if (prev.indexOf(current) === -1) {
      prev0 = prev.concat(current);
    }

    return prev0;
  }, []);

  return this;
};

// Define language to exoort with default template
JSONtransform.prototype.toMD = function (template) {
  this['md_' + template] && this['md_' + template]() || this.md_table();
  return this;
};

// Define template
JSONtransform.prototype.md_table = function () {
  var that = this;
  var str = '# TABLE OF CONTENT\n';

  var toc = this.topics.map(function (topic) {
    return '* [' + topic.toUpperCase() + '](#' + topic + ')\n';
  });

  str += toc.join('');

  var sections = this.topics.map(function (topic) {
    return '\n# ' + topic.toUpperCase() + ' \n'
      + '| TITLE | DESCRIPTION | NPM | GITHUB | \n'
      + '| ----- | ----------- | --- | ------ |\n'

      + that.input.filter(function (entry) {
        var result = false;
        if (entry.topics.indexOf(topic) > -1) {
          result = true;
        }
        return result;
      }).map(function (entry) {
        return '| ' + entry.title + ' | ' + entry.desc + ' | ' + (entry.package && ('[' + entry.package + '](http://www.npmjs.com/package/' + entry.package + ')')) + ' | [' + entry.title + '](' + entry.repository + ')  |';
      }).join('\n')
      + '\n';
  });

  str += sections.join('');

  this.computedTemplate = str;

  return this;
};
```

## API

```js
// JSON reference
this.input 
```

```js
// String refernce for output
this.computedTemplate 
```

```js
// Parse JSON if needed with a parser function
.parse(fn);
```

```js
// Transform JSON to any language/template with a templating function
.transform(fn);
```

```js
// Export result to string
.toString();
```


```js
// Export result to file
.toFile('./PATH/FILE.EXT');
```
