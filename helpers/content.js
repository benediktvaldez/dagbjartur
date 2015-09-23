var files = require('./files');

var content = {};

content.getAll = function() {
  return files.getMarkdownFilesRecursively('./content');
};

module.exports = content;
