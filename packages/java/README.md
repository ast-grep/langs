# ast-grep napi language for java

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-java
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import java from '@ast-grep/lang-java'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ java })

const sg = parse('java', `your code`)
sg.root().kind()
```
