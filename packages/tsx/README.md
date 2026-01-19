# ast-grep napi language for tsx

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-tsx
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import tsx from '@ast-grep/lang-tsx'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ tsx })

const sg = parse('tsx', `your code`)
sg.root().kind()
```
