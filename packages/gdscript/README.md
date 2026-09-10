# ast-grep napi language for gdscript

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-gdscript
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import gdscript from '@ast-grep/lang-gdscript'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ gdscript })

const sg = parse('gdscript', `your code`)
sg.root().kind()
```
