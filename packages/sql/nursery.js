const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'sql',
  treeSitterPackage: '@derekstride/tree-sitter-sql',
  languageRegistration,
  testRunner: _parse => {
    // add test here
  },
})
