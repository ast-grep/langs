# ast-grep napi language for python

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-python
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import python from '@ast-grep/lang-python'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ python })

const sg = parse('python', `your code`)
sg.root().kind()
```
