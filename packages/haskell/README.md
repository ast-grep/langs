# ast-grep napi language for haskell

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-haskell
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import haskell from '@ast-grep/lang-haskell'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ haskell })

const sg = parse('haskell', `your code`)
sg.root().kind()
```
