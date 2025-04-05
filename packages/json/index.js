const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['json'],
  languageSymbol: 'tree_sitter_json',
  expandoChar: '$',
}
