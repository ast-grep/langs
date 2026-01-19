# ast-grep napi language for angular

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-angular
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import angular from '@ast-grep/lang-angular'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ angular })

const sg = parse('angular', `your code`)
sg.root().kind()
```
