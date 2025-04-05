const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['rb', 'rbw', 'gemspec'],
  languageSymbol: 'tree_sitter_ruby',
  expandoChar: 'µ',
}
