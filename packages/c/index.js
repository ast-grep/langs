const path = require('node:path')

function getNativePath() {
  if (process.platform === 'win32') {
    if (process.arch === 'x64') {
      return 'prebuilds/prebuild-Windows-X64/parser.so'
    }

    throw new Error(`Unsupported architecture on Windows: ${process.arch}`)
  } else if (process.platform === 'darwin') {
    if (process.arch === 'arm64') {
      return 'prebuilds/prebuild-macOS-ARM64/parser.so';
    }

    throw new Error(`Unsupported architecture on macOS: ${process.arch}`)
  } else if (process.platform === 'linux') {
    if (process.arch === 'x64') {
      return 'prebuilds/prebuild-Linux-X64/parser.so';
    }

    throw new Error(`Unsupported architecture on Linux: ${process.arch}`)
  }

  throw new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`)
}

const libPath = path.join(__dirname, getNativePath())

module.exports = {
  libraryPath: libPath,
  extensions: ['c', 'h'],
  languageSymbol: 'tree_sitter_c',
  expandoChar: '_',
}
