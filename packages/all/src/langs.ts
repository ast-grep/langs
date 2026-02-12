import angular from "@ast-grep/lang-angular"
import bash from "@ast-grep/lang-bash"
import c from "@ast-grep/lang-c"
import cpp from "@ast-grep/lang-cpp"
import csharp from "@ast-grep/lang-csharp"
import css from "@ast-grep/lang-css"
import dart from "@ast-grep/lang-dart"
import elixir from "@ast-grep/lang-elixir"
import go from "@ast-grep/lang-go"
import haskell from "@ast-grep/lang-haskell"
import html from "@ast-grep/lang-html"
import java from "@ast-grep/lang-java"
import javascript from "@ast-grep/lang-javascript"
import json from "@ast-grep/lang-json"
import kotlin from "@ast-grep/lang-kotlin"
import lua from "@ast-grep/lang-lua"
import php from "@ast-grep/lang-php"
import python from "@ast-grep/lang-python"
import ruby from "@ast-grep/lang-ruby"
import rust from "@ast-grep/lang-rust"
import scala from "@ast-grep/lang-scala"
import sql from "@ast-grep/lang-sql"
import swift from "@ast-grep/lang-swift"
import toml from "@ast-grep/lang-toml"
import tsx from "@ast-grep/lang-tsx"
import typescript from "@ast-grep/lang-typescript"
import yaml from "@ast-grep/lang-yaml"
import type {
	DynamicLangRegistrations,
	LangRegistration,
} from "@ast-grep/napi/types/registerDynamicLang.js"
import { Lang } from "./lang.ts"

type StaticLangRegistration =
	| typeof angular
	| typeof bash
	| typeof c
	| typeof cpp
	| typeof csharp
	| typeof css
	| typeof dart
	| typeof elixir
	| typeof go
	| typeof haskell
	| typeof html
	| typeof java
	| typeof javascript
	| typeof json
	| typeof kotlin
	| typeof lua
	| typeof php
	| typeof python
	| typeof ruby
	| typeof rust
	| typeof scala
	| typeof sql
	| typeof swift
	| typeof toml
	| typeof tsx
	| typeof typescript
	| typeof yaml
	| LangRegistration

interface StaticLangRegistrations {
	Angular: typeof angular
	Bash: typeof bash
	C: typeof c
	Cpp: typeof cpp
	CSharp: typeof csharp
	Css: typeof css
	Dart: typeof dart
	Elixir: typeof elixir
	Go: typeof go
	Haskell: typeof haskell
	Html: typeof html
	Java: typeof java
	JavaScript: typeof javascript
	Json: typeof json
	Kotlin: typeof kotlin
	Lua: typeof lua
	Php: typeof php
	Python: typeof python
	Ruby: typeof ruby
	Rust: typeof rust
	Scala: typeof scala
	Sql: typeof sql
	Swift: typeof swift
	Toml: typeof toml
	Tsx: typeof tsx
	TypeScript: typeof typescript
	Yaml: typeof yaml

	/** To satisfy {@link DynamicLangRegistrations}. */
	[langName: string]: StaticLangRegistration
}

/**
 * Built-in dynamic languages supported by `@ast-grep/langs`.
 */
export const langs: StaticLangRegistrations = {
	[Lang.Angular]: angular,
	[Lang.Bash]: bash,
	[Lang.C]: c,
	[Lang.Cpp]: cpp,
	[Lang.CSharp]: csharp,
	[Lang.Css]: css,
	[Lang.Dart]: dart,
	[Lang.Elixir]: elixir,
	[Lang.Go]: go,
	[Lang.Haskell]: haskell,
	[Lang.Html]: html,
	[Lang.Java]: java,
	[Lang.JavaScript]: javascript,
	[Lang.Json]: json,
	[Lang.Kotlin]: kotlin,
	[Lang.Lua]: lua,
	[Lang.Php]: php,
	[Lang.Python]: python,
	[Lang.Ruby]: ruby,
	[Lang.Rust]: rust,
	[Lang.Scala]: scala,
	[Lang.Sql]: sql,
	[Lang.Swift]: swift,
	[Lang.Toml]: toml,
	[Lang.Tsx]: tsx,
	[Lang.TypeScript]: typescript,
	[Lang.Yaml]: yaml,
}
