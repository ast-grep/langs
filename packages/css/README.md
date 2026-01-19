# ast-grep napi language for css

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-css
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import css from '@ast-grep/lang-css'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ css })

const sg = parse('css', `your code`)
sg.root().kind()
```
