# ast-grep napi language for c

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-c
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import c from '@ast-grep/lang-c'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ c })

const sg = parse('c', `your code`)
sg.root().kind()
```
