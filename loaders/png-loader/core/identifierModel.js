const piexif = require('piexifjs');
const getInsertExifbytes = require('./getInsertExifbytes');

module.exports = {
  hasIdentifier: (buffer, identifier) => {
    let binary = buffer.toString('binary');
    let exifObj = piexif.load(binary);
    console.log(exifObj, identifier);
    return exifObj['0th'][piexif.ImageIFD.Make] === identifier;
  },
  insertIdentifier(buffer, identifier) {
    let binary = buffer.toString('binary');
    result = piexif.insert(getInsertExifbytes(identifier), binary);
    return Buffer.from(result, "binary");
  }
}