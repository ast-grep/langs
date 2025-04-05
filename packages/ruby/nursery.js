const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'ruby',
  treeSitterPackage: 'tree-sitter-ruby',
  languageRegistration,
  testRunner: parse => {
    const sg = parse('Foo::bar()')
    const root = sg.root()
    const node = root.find('Foo::$METHOD()')
    assert.equal(node.kind(), 'call')
  },
})
