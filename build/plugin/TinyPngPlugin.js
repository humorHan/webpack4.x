class TinyPngPlugin {
  constructor(opt) {
    this._PLUGIN_NAME = 'TinyPngPlugin';
    this.opt = opt;
  }

  apply(compiler) {
    compiler.hooks.compile.tap(this._PLUGIN_NAME, (compilation, callback) => {
      // let assets = compilation.compilation.assets
      // let img = Object.keys(assets).map((asset, index) => {
      //   return //.test(asset)
      // })
    })
  }
}

module.exports = TinyPngPlugin;