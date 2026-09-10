# ast-grep napi language for gdscript

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-gdscript
# pnpm v10 and above block postinstall scripts, so allow this one explicitly
pnpm install --allow-build=@ast-grep/lang-gdscript @ast-grep/lang-gdscript
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

The postinstall script places the parser library for your platform. If it does not
run and no prebuild is bundled, `parser.so` is never built and `libraryPath` throws.

## Usage

```js
import gdscript from '@ast-grep/lang-gdscript'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ gdscript })

const sg = parse('gdscript', `your code`)
sg.root().kind()
```

## expandoChar and leading-underscore identifiers

This package uses `expandoChar: '_'`, because tree-sitter-gdscript accepts only
ASCII identifiers and a non-ASCII expando char fails to parse.

The cost is that a pattern containing a literal leading-underscore ALL-CAPS
identifier is read as a metavariable. That spelling is GDScript's private-constant
convention, so `_MAX_SPEED` as a pattern matches every node rather than that one
constant. Lowercase identifiers, including `_init` and `_process`, are unaffected.

To match such an identifier literally, use a rule with `regex` instead of a pattern.
A declaration binds it as `name` and a use as `identifier`, so match both:

```yaml
id: literal-const
language: gdscript
rule:
  regex: ^_MAX_SPEED$
  any:
    - kind: identifier
    - kind: name
```
