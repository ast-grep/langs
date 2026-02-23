# ast-grep napi language for systemverilog

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-systemverilog
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

## Usage

```js
import systemverilog from '@ast-grep/lang-systemverilog'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ systemverilog })

const sg = parse('systemverilog', `module top; logic a; endmodule`)
sg.root().kind()
```
