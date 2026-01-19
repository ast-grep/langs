# ast-grep napi language for bicep

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-bicep
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import bicep from '@ast-grep/lang-bicep'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ bicep })

const code = `
param location string = 'eastus'
param storageAccountName string = 'mystorageaccount'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}
`

const sg = parse('bicep', code)
sg.root().kind()
```

## About Bicep

Azure Bicep is a domain-specific language (DSL) for deploying Azure resources declaratively. It provides a transparent abstraction over ARM templates and aims to drastically simplify the authoring experience.

For more information, visit the [official Bicep documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview).

## Pattern Matching

Since Bicep does not support `$` as an identifier character, ast-grep uses `_` (underscore) as the expando character for pattern matching:

```js
// Find all parameter declarations
const params = sg.root().findAll('param $NAME string')

// Find all resource declarations
const resources = sg.root().findAll('resource $NAME $TYPE = { $$$ }')
```

Note: While you write `$` in your pattern strings, ast-grep internally translates them to `_` when parsing Bicep code.
