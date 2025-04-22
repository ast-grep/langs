# ast-grep napi language for yaml

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-yaml
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import yaml from '@ast-grep/lang-yaml'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ yaml })

const sg = parse('yaml', `your code`)
sg.root().kind()
```
