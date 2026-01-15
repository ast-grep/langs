const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'glimmer-typescript',
  treeSitterPackage: 'tree-sitter-glimmer-typescript',
  languageRegistration,
  testRunner: (parse) => {
    const sg = parse(`
import Component from '@glimmer/component';

function isLatestVersion(): boolean {
  const stableRegex = /^d+.d+.d+$/;
  return !stableRegex.test(VERSION);
}

interface WelcomePageComponentSignature {
  Args: {
    extension?: 'hbs' | 'gjs' | 'gts';
  };
}

export default class WelcomePageComponent extends Component<WelcomePageComponentSignature> {
  <template>
    <main id="ember-welcome-page-id-selector">
      <Hello> </Hello>
    </main>
  </template>

  @service session;

  get extension(): 'hbs' | 'gjs' | 'gts' {
    return this.args.extension ?? 'hbs';
  }
}
  `);
    const root = sg.root()

    const getter = root.find({
      rule: {
        kind: 'method_definition'
      }
    });
    const property = getter.find({ rule: { kind: 'property_identifier' } });
    assert.equal(property.text(), 'extension')

    const service = root.find({ rule: { kind: 'public_field_definition > property_identifier' } });
    assert.equal(service.text(), 'session');

    const main_tag = root.find({ rule: { kind: 'glimmer_template > glimmer_opening_tag' } });
    assert.equal(main_tag.text(), '<template>');
  }
})
