# ast-grep napi language for swift

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-swift
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import swift from '@ast-grep/lang-swift'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ swift })

const sg = parse('swift', `your code`)
sg.root().kind()
```
