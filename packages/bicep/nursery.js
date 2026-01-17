const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')
const assert = require('node:assert')

setup({
  dirname: __dirname,
  name: 'bicep',
  treeSitterPackage: 'tree-sitter-bicep',
  languageRegistration,
  testRunner: parse => {
    const sg = parse("param location string = 'eastus'")
    const root = sg.root()
    // Test basic pattern matching with metavar
    const node = root.find('param $NAME string')
    assert.ok(node !== null, 'Should find parameter declaration')
    assert.equal(node.kind(), 'parameter_declaration')
  },
})
