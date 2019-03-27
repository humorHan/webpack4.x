const loaderUtils = require('loader-utils');
const upload = require('./core/upload.js');

/**
 * 自定义loader
 * @param {*} source 匹配到文件的内容
 * @return str 返回匹配到文件经过该loader处理后的内容
 */
module.exports = async function(source) {
  const done = this.async();
  // TODO 根据this.fs写loading？--对比匹配好的图片总量和【无需上传+上传成功】数对比
  let options = Object.assign({
    ext: ['png', 'jpeg', 'jpg'],
    identifier: 'COMMON',
    resourcePath: this.resourcePath
  }, loaderUtils.getOptions(this));
  if (!options.key || typeof options.key !== 'string') {
    throw new Error('tinyPNG key not available or empty');
  }
  let reg = new RegExp(options.ext.join('|'));
  if (!options.ext.every(item => {
    return reg.test(item);
  })) {
    throw new Error('仅支持【jpg, jpeg, png】类型图片的压缩，请检查配置')
  }

  console.time('upload')
  // compress
  let buffer = await upload(options);
  console.timeEnd('upload')
  return done(null, buffer);
}
