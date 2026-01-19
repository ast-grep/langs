# ast-grep napi language for cpp

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-cpp
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import cpp from '@ast-grep/lang-cpp'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ cpp })

const sg = parse('cpp', `your code`)
sg.root().kind()
```
