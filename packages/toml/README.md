# ast-grep napi language for toml

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-toml
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import toml from '@ast-grep/lang-toml'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ toml })

const sg = parse('toml', `your code`)
sg.root().kind()
```
