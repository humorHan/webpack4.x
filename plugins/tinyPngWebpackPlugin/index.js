const upload = require('./core/upload.js');

class TinyPngWebpackPlugin {
  constructor(options) {
    this.options = Object.assign({
      ext: ['png', 'jpeg', 'jpg'],
    }, options);
    let { key } = this.options;
    if (!key || typeof key !== 'string') {
      throw new Error('tinyPNG key not available or empty');
    }
  }
  apply(compiler) {
    compiler.hooks.emit.tapPromise('TinyPngWebpackPlugin', async (compilation) => {
      // TODO progress-bar
      upload(compilation, this.options);
    });
  }
}

module.exports = TinyPngWebpackPlugin;