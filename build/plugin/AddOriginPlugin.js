class AddOriginPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compile.tap('AddOriginPlugin', function(compilation, callback) {
      compilation.hooks.addEntry.tap(null,'/Users/humorhan/mine/webpack4.x/a.js', 'AddOriginPlugin', function(compilation){
        console.log(compilation);
      })
      compiler.options.entry['mock'] = '/Users/humorhan/mine/webpack4.x/a.js';
      // console.log(compilation.addModule('mock', '/Users/humorhan/mine/webpack4.x/a.js'));
      // console.log(compiler.options.entry);
    });
  }
}


module.exports = AddOriginPlugin;