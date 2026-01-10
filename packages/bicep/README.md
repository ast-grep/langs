# ast-grep napi language for bicep

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-bicep
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import bicep from '@ast-grep/lang-bicep'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ bicep })

const sg = parse('bicep', `your code`)
sg.root().kind()
```

## About Bicep

Azure Bicep is a domain-specific language (DSL) for deploying Azure resources declaratively. It provides a transparent abstraction over ARM templates and aims to drastically simplify the authoring experience.

For more information, visit the [official Bicep documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview).

## Pattern Matching

Since Bicep does not support `$` as an identifier character, ast-grep uses `_` (underscore) as the expando character for pattern matching:

```js
// Find all variable declarations
const node = sg.root().find('var $NAME = $VALUE')
```

Note: While you write `$` in your pattern strings, ast-grep internally translates them to `_` when parsing Bicep code.
