const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'yaml',
  treeSitterPackage: '@tree-sitter-grammars/tree-sitter-yaml',
  languageRegistration,
  testRunner: parse => {
    // Based on test_yaml_str
    let sg = parse('123')
    let node = sg.root().find('123')
    assert.ok(node, 'should match simple scalar')
    node = sg.root().find("'123'")
    assert.ok(!node, 'should not match quoted scalar')

    // Based on test_yaml_pattern
    sg = parse('foo: 123')
    node = sg.root().find('foo: $BAR')
    assert.ok(node, 'should match key-value with metavariable')
    let match = node.getMatch('BAR')
    assert.equal(match.text(), '123')

    sg = parse('foo: [1, 2, 3]')
    node = sg.root().find('foo: $$$')
    assert.ok(node, 'should match key-list with multi-metavariable')

    sg = parse(`foo:
      - a`)
    node = sg.root().find('foo: $BAR')
    assert.ok(node, 'should match key-sequence with metavariable')
    match = node.getMatch('BAR')
    assert.equal(match.kind(), 'block_node') // Updated expected kind

    sg = parse('bar: bar')
    node = sg.root().find('foo: $BAR')
    assert.ok(!node, 'should not match incorrect key')

    // Based on test_yaml_replace (testing find, as replace is not directly available)
    const SOURCE = `
key: value
list:
  - item1
  - item2
`
    sg = parse(SOURCE)
    node = sg.root().find('$KEY: value')
    assert.ok(node, 'should find key-value pair for replacement test')
    match = node.getMatch('KEY')
    assert.equal(match.text(), 'key')
  },
})
