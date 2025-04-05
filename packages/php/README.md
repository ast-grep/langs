# ast-grep napi language for php

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-php
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import php from '@ast-grep/lang-php'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ php })

const sg = parse('php', `your code`)
sg.root().kind()
```
