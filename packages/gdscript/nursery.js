const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'gdscript',
  treeSitterPackage: 'tree-sitter-gdscript',
  languageRegistration,
  testRunner: parse => {
    const sg = parse('print(123)')
    const root = sg.root()
    const node = root.find('print($A)')
    assert.equal(node.kind(), 'call')
  },
})
