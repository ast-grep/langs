# ast-grep napi language for scala

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-scala
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import scala from '@ast-grep/lang-scala'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ scala })

const sg = parse('scala', `your code`)
sg.root().kind()
```
