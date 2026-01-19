# ast-grep napi language for sql

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-sql
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import sql from '@ast-grep/lang-sql'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ sql })

const sg = parse('sql', `your code`)
sg.root().kind()
```
