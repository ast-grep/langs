const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'kotlin',
  treeSitterPackage: 'tree-sitter-kotlin',
  languageRegistration,
  testRunner: parse => {
    const sg = parse('println(123)')
    const root = sg.root()
    const node = root.find('println($A)')
    assert.equal(node.kind(), 'call_expression')
  },
})
