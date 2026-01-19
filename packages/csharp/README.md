# ast-grep napi language for csharp

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-csharp
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import csharp from '@ast-grep/lang-csharp'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ csharp })

const sg = parse('csharp', `your code`)
sg.root().kind()
```
