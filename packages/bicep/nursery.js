const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')
const assert = require('node:assert')

setup({
  dirname: __dirname,
  name: 'bicep',
  treeSitterPackage: 'tree-sitter-bicep',
  languageRegistration,
  testRunner: parse => {
    const sg = parse("var foo = 'bar'")
    const root = sg.root()
    // Test basic pattern matching with metavar
    const node = root.find('var $A')
    assert.ok(node !== null, 'Should find variable declaration')
    assert.equal(node.kind(), 'variable_declaration')
  },
})
