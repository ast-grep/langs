const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')
const assert = require('node:assert')

setup({
  dirname: __dirname,
  name: 'systemverilog',
  treeSitterPackage: 'tree-sitter-systemverilog',
  languageRegistration,
  testRunner: parse => {
    // Basic module parsing test
    const sg = parse('module top; logic a; endmodule')
    const root = sg.root()
    assert.ok(root, 'root node should exist')

    // Pattern matching test with expando char '_'
    const node = root.find('module $M; $$$BODY endmodule')
    assert.ok(node, 'module pattern should match')

    // System task literal test - $ should not be treated as meta variable
    const sg2 = parse('module t; initial $display("hello"); endmodule')
    const root2 = sg2.root()
    assert.ok(root2, 'system task module should parse')
  },
})
