var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var marked = require('meta-marked');

var files = {};

files.getFile = function(name) {
  try {
    return fs.readFileSync(name, 'utf8');
  } catch(exc) {
    return false;
  }
};

files.parseMarkdown = function(file) {
  try {
    if (!file) { throw 'No file provided'; }
    return marked(file);
  } catch(exc) {
    return {error:1, exception: exc};
  }
};

files.getMarkdownFile = function(name) {
  if (!name) { return name; }
  var file = files.getFile(name);
  return files.parseMarkdown(file);
};

files.getMarkdownFilesRecursively = function(parentFolder) {
  if (!parentFolder) { return {error:1}; }

  var response = {};

  var fileNames = fs.readdirSync(parentFolder);

  var parentFolderName = parentFolder.split('/');
  parentFolderName = parentFolderName[parentFolderName.length-1];

  _.each(fileNames, function(fileName) {
    var filePath = path.join(parentFolder, fileName);
    var fullPath = filePath.replace('content/', '/');
    var cleanFileName = fileName.replace('.md', '');

    if (fs.statSync(filePath).isDirectory()) {

      var index = files.getMarkdownFile(path.join(filePath, 'index.md'));
      index = !index.hasOwnProperty('error') && index.error !== 1 ? index : false;

      response[fileName] = index || {};
      response[fileName]['isFolder'] = true;
      response[fileName]['id'] = cleanFileName;
      response[fileName]['path'] = fullPath;
      response[fileName]['files'] = files.getMarkdownFilesRecursively(filePath);

    } else if (fileName.indexOf('.md') > -1) {

      if (fileName !== 'index.md' && (parentFolderName && parentFolderName !== 'content')) {
        response[cleanFileName] = files.getMarkdownFile(filePath);
        response[cleanFileName]['path'] = fullPath.replace('.md', '');
      } else if (parentFolderName && parentFolderName === 'content') {
        response[cleanFileName] = files.getMarkdownFile(filePath);
        response[cleanFileName]['path'] = fullPath.replace('.md', '').replace('/index', '/');
      }

    }
  });

  return response;
};

module.exports = files;
