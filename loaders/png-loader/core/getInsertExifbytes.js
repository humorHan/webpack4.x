const piexif = require('piexifjs')

module.exports = (identifier) => {
  return piexif.dump({
    "0th": {
      [piexif.ImageIFD.Make]: identifier
    },
    Exif: {},
    GPS: {}
  })
}