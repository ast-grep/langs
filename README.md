# Monorepo for `@ast-grep/lang-*` packages

This monorepo contains two folders: `packages` and `scripts`.

## Packages

Packages contain a list of prebuild tree-sitter grammars to use with the `@ast-grep/napi` package.

Typical usage:

1. Install the language package in your project.

> [!NOTE]
> As of [PNPM version 10](https://socket.dev/blog/pnpm-10-0-0-blocks-lifecycle-scripts-by-default), postinstall scripts are no longer run by default. All language packages contain [postinstall](https://github.com/ast-grep/langs/blob/main/scripts/setup/index.ts#L20) scripts that will place the relevant language parsing library in the correct location for the targeted platform. You must explicitly allowlist the postinstall script to run for your desired language package.

```bash
# PNPM <v10 - postinstall scripts run by default.
pnpm install @ast-grep/lang-{name}
# PNPM v10 and above: Explictly allow the postinstall script to run for this language package
pnpm install --allow-build=@ast-grep/lang-{name} @ast-grep/lang-{name}
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install tree-sitter-cli --save-dev
```

2. Use the language package in your project

```javascript
import lang from '@ast-grep/lang-{name}'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ [langName]: lang })

const sg = parse(langName, `your code`)
sg.root().kind()
```

## Scripts

Scripts contain a list of scripts to help with the development of the packages.

### `scripts/create-lang`

You can use `pnpm create @ast-grep/lang` to create a new language package.

```bash
# create a new language package in current directory
pnpm create @ast-grep/lang
# create package in a specific directory
pnpm create @ast-grep/lang some-dir
```

You will be prompted to enter the language name, the language file extension, package name and tree-sitter grammar package.

Note the tree-sitter grammar package is different from the package name. package name is the repo you create, tree-sitter package should be a package already published on npm.

After the package is created, you can use these commands:

```bash
pnpm source # copy tree-sitter grammar files to the src folder
pnpm build # build the tree-sitter grammar files to dynamic lib
pnpm test # test the tree-sitter grammar files
```

You can edit `nursery.js` to add test case for your language.


### `scripts/nursery`

A build-time dependency for the `@ast-grep/lang-*` packages.
It is used to copy and test the tree-sitter grammars.

### `scripts/setup`

A postinstall script to setup parser dynamic library for the `@ast-grep/lang-*` packages.
If there is prebuild available, it will copy the dynamic library according to the platform and architecture.
If there is no prebuild available, it will build the dynamic library from the tree-sitter grammar files.
