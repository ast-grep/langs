# ast-grep napi language for json

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-json
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import json from '@ast-grep/lang-json'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ json })

const sg = parse('json', `your code`)
sg.root().kind()
```
