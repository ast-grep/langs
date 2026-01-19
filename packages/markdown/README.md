# ast-grep napi language for markdown

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-markdown
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import markdown from '@ast-grep/lang-markdown'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ markdown })

const sg = parse('markdown', `your code`)
sg.root().kind()
```
