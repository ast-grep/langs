# ast-grep napi language for Python

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-python
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import Python from '@ast-grep/lang-python'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ Python })

const sg = parse('Python', `your code`)
sg.root().kind()
```
