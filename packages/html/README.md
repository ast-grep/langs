# ast-grep napi language for html

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-html
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import html from '@ast-grep/lang-html'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ html })

const sg = parse('html', `your code`)
sg.root().kind()
```
