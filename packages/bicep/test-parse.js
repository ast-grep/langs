const { parse, registerDynamicLanguage } = require('@ast-grep/napi')
const bicep = require('./index')

registerDynamicLanguage({ bicep })

const code = "param location string = 'eastus'"
console.log('Parsing:', code)
const sg = parse('bicep', code)
console.log('Root kind:', sg.root().kind())
console.log('Root text:', sg.root().text())
console.log('Children:')
const children = sg.root().children()
for (let i = 0; i < children.length; i++) {
  const child = children[i]
  console.log(`  ${i}: ${child.kind()} - "${child.text()}"`)
}

// Try to find the parameter
console.log('\nTrying pattern: param µNAME string')
const node = sg.root().find('param µNAME string')
console.log('Found node:', node ? node.kind() : 'null')
