# ast-grep napi language for glimmer-javascript

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-glimmer-javascript
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import glimmerJavascript from '@ast-grep/lang-glimmer-javascript'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ glimmerJavascript })

const sg = parse('glimmerJavascript', `your code`)
sg.root().kind()
```

