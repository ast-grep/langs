const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')
const path = require('node:path')

setup({
  dirname: __dirname,
  name: 'typescript',
  treeSitterPackage: 'tree-sitter-typescript',
  src: path.join('typescript', 'src'),
  languageRegistration,
  testRunner: parse => {
    const sg = parse('let x: number = 123')
    const root = sg.root()
    const node = root.find('let $VAR: number = $VALUE')
    assert.equal(node.kind(), 'lexical_declaration')
  },
})
