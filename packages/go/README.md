# ast-grep napi language for go

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-go
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import go from '@ast-grep/lang-go'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ go })

const sg = parse('go', `your code`)
sg.root().kind()
```
