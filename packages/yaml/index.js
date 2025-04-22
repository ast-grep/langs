const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['yaml', 'yml'],
  languageSymbol: 'tree_sitter_yaml',
  expandoChar: '$',
}
