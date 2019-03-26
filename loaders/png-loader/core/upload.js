const tinify = require('tinify');
const fs = require('fs');
const chalk = require('chalk');
const validateTinyPng = require('./validateTinyPng');
const identifierModel = require('./identifierModel');

module.exports = async (options) => {
  let { ext, key, resourcePath, identifier } = options;
  tinify.key = key;
  let buffer = fs.readFileSync(resourcePath);
  if (!new RegExp(ext.join('|')).test(resourcePath)) {
    console.log(chalk.yellow(`${resourcePath} 该文件未压缩。原因：该图片后缀未匹配到设置的需要压缩的图片后缀`));
    return buffer;
  }
  await validateTinyPng();

  if (identifierModel.hasIdentifier(buffer, identifier)) {
    console.log(chalk.green(`${resourcePath} 已经被压缩过，无需再压缩`));
    return buffer;
  };
  // TODO upload loading ui
  buffer = await tinify.fromBuffer(buffer).toBuffer().then(resultData => {
    resultData = identifierModel.insertIdentifier(resultData, identifier);
    fs.writeFileSync(resourcePath, resultData);
    return resultData;
  }).catch((err) => {
    // TODO return origin buffer???
    throw new Error(err);
  });
  return buffer;
}