# ast-grep napi language for dart

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-dart
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import dart from '@ast-grep/lang-dart'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ dart })

const sg = parse('dart', `your code`)
sg.root().kind()
```
