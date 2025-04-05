const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')
const path = require('node:path')

setup({
  dirname: __dirname,
  name: 'php',
  treeSitterPackage: 'tree-sitter-php',
  src: path.join('php', 'src'),
  languageRegistration,
  testRunner: parse => {
    const sg = parse('123')
    const root = sg.root()
    const node = root.find('123')
    assert.equal(node.kind(), 'text')
  },
})
