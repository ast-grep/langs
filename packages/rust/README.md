# ast-grep napi language for rust

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-rust
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import rust from '@ast-grep/lang-rust'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ rust })

const sg = parse('rust', `your code`)
sg.root().kind()
```
