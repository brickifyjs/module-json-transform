'use strict';

var o = require('ospec');
var fs = require('fs');

var JSONtransform = require('../index.js');

o.spec('JSONtransform', function () {
  var md;

  o('create instance', function () {
    md = new JSONtransform([
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
    ]);

    o(md instanceof JSONtransform).equals(true);
    o(md.hasOwnProperty('input')).equals(true);
  });

  o('create instance from string', function () {
    md = new JSONtransform('[{"repository": "URL","package": "PACKAGE_NAME","title": "PROJECT TITLE","desc": "PROJECT DESCRIPTION","topics": ["JAVASCRIPT"]}]');

    o(md instanceof JSONtransform).equals(true);
    o(md.hasOwnProperty('input')).equals(true);
  });


  o('parse', function () {
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

    md.parse(parser);
    o(md.hasOwnProperty('topics')).equals(true);
  });


  o('transform', function () {
    var transformer = function () {
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
    md.transform(transformer);
    o(md.hasOwnProperty('computedTemplate')).equals(true);
    o(typeof md.computedTemplate).equals('string');
  });

  o('export to string', function () {
    o(typeof md.toString()).equals('string');
  });


  o('export to file', function (done, timeout) {
    var path = './src/tests/test.md';

    md.toFile(path);

    timeout(250);

    fs.stat(path, function () {
      fs.unlink(path, function () {
        setTimeout(done, true);
      });
    });
  });
});
