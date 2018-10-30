class AddOriginPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap('AddOriginPlugin', function(compilation, callback) {
      compiler.options.entry['mock'] = '/Users/humorhan/mine/webpack4.x/a.js';
      console.log(compiler.options.entry);
    });
  }
}


module.exports = AddOriginPlugin;