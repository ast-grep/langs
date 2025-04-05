const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'json',
  treeSitterPackage: 'tree-sitter-json',
  languageRegistration,
  testRunner: parse => {
    const sg = parse('{"abc": 123}')
    const root = sg.root()
    const node = root.find('{ $$$ }')
    assert.equal(node.kind(), 'object')
  },
})
