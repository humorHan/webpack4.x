const loaderUtils = require('loader-utils');
const upload = require('./core/upload.js');

/**
 * 自定义loader
 * @param {*} source 匹配到文件的内容
 * @return str 返回匹配到文件经过该loader处理后的内容
 */
module.exports = async function(source) {
  let options = Object.assign({
    ext: ['png', 'jpeg', 'jpg'],
    identifier: 'COMMON',
    resourcePath: this.resourcePath
  }, loaderUtils.getOptions(this));
  if (!options.key || typeof options.key !== 'string') {
    throw new Error('tinyPNG key not available or empty');
  }
  // TODO 校验tinyPng支持的格式
  // compress
  let buffer = await upload(options);
  
  return buffer;
}
