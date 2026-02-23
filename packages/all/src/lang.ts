/**
 * An enum of all languages supported by `@ast-grep/langs`.
 */
export const Lang = {
	Angular: "Angular",
	Bash: "Bash",
	C: "C",
	Cpp: "Cpp",
	CSharp: "CSharp",
	Css: "Css",
	Dart: "Dart",
	Elixir: "Elixir",
	Go: "Go",
	Haskell: "Haskell",
	Html: "Html",
	Java: "Java",
	JavaScript: "JavaScript",
	Json: "Json",
	Kotlin: "Kotlin",
	Lua: "Lua",
	Php: "Php",
	Python: "Python",
	Ruby: "Ruby",
	Rust: "Rust",
	Scala: "Scala",
	Sql: "Sql",
	Swift: "Swift",
	Toml: "Toml",
	Tsx: "Tsx",
	TypeScript: "TypeScript",
	Yaml: "Yaml",
} as const

/**
 * An enum of all languages supported by `@ast-grep/langs`.
 */
export type Lang = (typeof Lang)[keyof typeof Lang]
