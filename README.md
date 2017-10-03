## module-json-transform

> Transform any JSON into any language/template

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
