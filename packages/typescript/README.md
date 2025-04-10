# ast-grep napi language for typescript

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-typescript
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import typescript from '@ast-grep/lang-typescript'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ typescript })

const sg = parse('typescript', `your code`)
sg.root().kind()
```
