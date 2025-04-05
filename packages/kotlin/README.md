# ast-grep napi language for kotlin

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-kotlin
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import kotlin from '@ast-grep/lang-kotlin'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ kotlin })

const sg = parse('kotlin', `your code`)
sg.root().kind()
```
