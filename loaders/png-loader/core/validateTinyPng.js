const chalk = require('chalk');
const tinify = require('tinify');

module.exports = () => {
  return tinify.validate().then((err) => {
    if (err) throw err;
    console.log(chalk.green(`本月剩余压缩次数: ${500 - tinify.compressionCount}`));
  })
}