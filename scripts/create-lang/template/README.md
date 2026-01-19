# ast-grep napi language for $$NAME$$

## Installation

In a pnpm project, run:

```bash
pnpm install $$PACKAGE_NAME$$
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import $$NAME$$ from '$$PACKAGE_NAME$$'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ $$NAME$$ })

const sg = parse('$$NAME$$', `your code`)
sg.root().kind()
```
