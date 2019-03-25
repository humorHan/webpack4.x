module.exports = (compilation, ext) => {
  return Object.keys(compilation.assets).map((asset) => {
    if (new RegExp(ext.join('|')).test(asset)) {
      return compilation.assets[asset].source();
    }
  }).filter(Boolean);
};
