import { parse, registerDynamicLanguage } from "@ast-grep/napi"
import { before, describe, test } from "node:test"
import { Lang } from "./lang.ts"
import { langs } from "./langs.ts"

describe("langs", () => {
	// @ts-expect-error Type `StaticLangRegistration` is missing the following
	// properties from type `LangRegistration`: `libraryPath`, `extensions`.
	before(() => registerDynamicLanguage(langs))

	// A newly supported language
	test(Lang.Dart, ({ assert }) => {
		const sg = parse(Lang.Dart, 'var x = "Hello, world!";"')
		const kind = sg.root().kind()
		assert.equal(kind, "program")
	})

	// A previously supported language
	test(Lang.Go, ({ assert }) => {
		const sg = parse(Lang.Go, 'x := "Hello, world!"')
		const kind = sg.root().kind()
		assert.equal(kind, "source_file")
	})

	// A built-in language
	test(Lang.TypeScript, ({ assert }) => {
		const sg = parse(Lang.TypeScript, 'const x = "Hello, world!"')
		const kind = sg.root().kind()
		assert.equal(kind, "program")
	})
})
