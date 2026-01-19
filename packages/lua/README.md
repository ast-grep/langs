# ast-grep napi language for lua

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-lua
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import lua from '@ast-grep/lang-lua'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ lua })

const sg = parse('lua', `your code`)
sg.root().kind()
```
