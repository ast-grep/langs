# ast-grep napi language for elixir

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-elixir
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import elixir from '@ast-grep/lang-elixir'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ elixir })

const sg = parse('elixir', `your code`)
sg.root().kind()
```
