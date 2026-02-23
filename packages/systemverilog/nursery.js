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
    assert.equal(node.kind(), 'module_declaration')

    // System task parsing test - verify $display parses correctly in the AST
    const sg2 = parse('module t; initial $display("hello"); endmodule')
    const root2 = sg2.root()
    assert.ok(root2, 'system task module should parse')

    // always_ff block pattern matching
    const sg3 = parse('module t; always_ff @(posedge clk) begin a <= 1; end endmodule')
    const root3 = sg3.root()
    assert.ok(root3, 'always_ff module should parse')
    const alwaysNode = root3.find('always_ff @($$$EVT) begin $$$BODY end')
    assert.ok(alwaysNode, 'always_ff pattern should match')
  },
})
