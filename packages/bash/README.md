# ast-grep napi language for bash

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-bash
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import bash from '@ast-grep/lang-bash'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ bash })

const sg = parse('bash', `your code`)
sg.root().kind()
```
