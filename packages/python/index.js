const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ["py"],
  languageSymbol: 'tree_sitter_Python',
  expandoChar: 'µ',
}
