let getImgs = require('./getImgs.js');
const tinify = require('tinify');

module.exports = (compilation, options) => {
  // filter img
  console.time('filter img');
  let imgs = getImgs(compilation, options.ext);
  console.timeEnd('filter img');

  // TODO 开始上传
  tinify.key = options.key;
  // TEST
  tinify.fromBuffer(imgs[0]).toBuffer((err, resultData) => {
    // console.log(resultData);
    require('fs').writeFile('1.out.jpg', resultData, function(err) {
      if(err) {console.log(err)}
    });
  })
}