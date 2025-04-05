# ast-grep napi language for ruby

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-ruby
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import ruby from '@ast-grep/lang-ruby'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ ruby })

const sg = parse('ruby', `your code`)
sg.root().kind()
```
