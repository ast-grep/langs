const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['ts', 'cts', 'mts'],
  languageSymbol: 'tree_sitter_typescript',
  expandoChar: '$',
}
