const FileUtils = require('FileUtils');
exports.allow = [];
exports.deny = [];

exports.init = () => {
  update();
}

let update = () => {
  this.allow = FileUtils.getRegex().allow;
  this.deny = FileUtils.getRegex().deny;
}

