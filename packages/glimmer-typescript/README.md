# ast-grep napi language for glimmer-typescript

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-glimmer-typescript
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import glimmerTypescript from '@ast-grep/lang-glimmer-typescript'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ glimmerTypescript })

const sg = parse('glimmerTypescript', `your code`)
sg.root().kind()
```

