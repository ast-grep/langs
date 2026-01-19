# ast-grep napi language for javascript

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-javascript
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import javascript from '@ast-grep/lang-javascript'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ javascript })

const sg = parse('javascript', `your code`)
sg.root().kind()
```
