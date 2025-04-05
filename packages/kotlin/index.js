const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['kt', 'ktm', 'kts'],
  languageSymbol: 'tree_sitter_kotlin',
  expandoChar: 'µ',
}
