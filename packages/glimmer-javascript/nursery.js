const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'glimmerJavascript',
  treeSitterPackage: 'tree-sitter-glimmer-javascript',
  languageRegistration,
  testRunner: (parse) => {
    const sg = parse(`
import Component from '@glimmer/component';

function isLatestVersion() {
  const stableRegex = /^d+.d+.d+$/;
  return !stableRegex.test(VERSION);
}

export default class WelcomePageComponent extends Component {
  <template>
    <main id="ember-welcome-page-id-selector">
      <Hello> </Hello>
    </main>
  </template>

  @service session;

  get extension() {
    return this.args.extension ?? 'hbs';
  }
}
  `)
    const root = sg.root()

    const getter = root.find({
      rule: {
        kind: 'method_definition',
      },
    })
    const property = getter.find({ rule: { kind: 'property_identifier' } })
    assert.equal(property.text(), 'extension')

    const service = root.find({ rule: { kind: 'field_definition > property_identifier' } })
    assert.equal(service.text(), 'session')

    const main_tag = root.find({ rule: { kind: 'glimmer_template > glimmer_opening_tag' } })
    assert.equal(main_tag.text(), '<template>')
  },
})
