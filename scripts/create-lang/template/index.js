const path = require('node:path')

function getLibPath() {
  const prebuild = resolvePrebuild(__dirname)
  if (prebuild) {
    return prebuild;
  }

  const native = path.join(__dirname, 'parser.so');
  if (fs.existsSync(native)) {
    return native;
  }

  throw new Error('No parser found. Please ensure the parser is built or a prebuild is available.');
}

let libPath;

module.exports = {
  get libraryPath() {
    if (!libPath) {
      libPath = getLibPath();
    }
    return libPath;
  },
  extensions: $$EXTENSIONS$$,
  languageSymbol: 'tree_sitter_$$NAME$$',
  expandoChar: '$$EXPANDO_CHAR$$',
}
