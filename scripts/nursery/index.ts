import type { DynamicLangRegistrations, SgRoot } from '@ast-grep/napi'
import { parse, registerDynamicLanguage } from '@ast-grep/napi'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Log to console
 */
function log(...args: unknown[]) {
  console.debug('@ast-grep/lang:', ...args)
}

/** Setup ast-grep/lang package's pre-release */
interface SetupConfig {
  /** the root directory of the package */
  dirname: string
  /** Name of the language. e.g. toml */
  name: string
  /** Language registration object, usually the export of index.js */
  languageRegistration: DynamicLangRegistrations[string]
  /** Package name of tree-sitter package. e.g. tree-sitter-css */
  treeSitterPackage: string
  /** Test cases running in CI */
  testRunner: (parse: (c: string) => SgRoot) => void
  /** Path of the `src` directory inside the `tree-sitter-*` package. Useful for
   * `tree-sitter-php`, `tree-sitter-typescript` and `tree-sitter-yaml`.
   * @default "src" */
  src?: string
}

function test(setupConfig: SetupConfig) {
  const { name, languageRegistration, testRunner } = setupConfig
  registerDynamicLanguage({ [name]: languageRegistration })
  testRunner(code => parse(name, code))
}

/** Setup ast-grep/lang package's pre-release build and test */
export function setup(setupConfig: SetupConfig) {
  const arg = process.argv[2]
  if (arg === 'test') {
    test(setupConfig)
  } else if (arg === 'source') {
    copySrcIfNeeded(setupConfig)
    generateLangNodeTypes(setupConfig)
  }
}

function copySrcIfNeeded(config: SetupConfig) {
  const { dirname, treeSitterPackage } = config
  const existing = path.join(dirname, 'src')
  const src = config.src || 'src'
  const source = path.join(dirname, 'node_modules', treeSitterPackage, src)
  if (fs.existsSync(existing)) {
    log('src exists, skipping copy')
    return
  }

  log('copying tree-sitter src')
  fs.cpSync(source, 'src', { recursive: true })
}

interface NodeBasicInfo {
  type: string
  named: boolean
}

interface NodeFieldInfo {
  multiple: boolean
  required: boolean
  types: NodeBasicInfo[]
}

interface NodeType extends NodeBasicInfo {
  root?: boolean
  fields?: {
    [fieldName: string]: NodeFieldInfo
  }
  children?: NodeFieldInfo
  subtypes?: NodeBasicInfo[]
}

function filterOutUnNamedNode(node: NodeType): NodeType | null {
  if (!node.named) {
    return null
  }
  if (node.fields) {
    for (const field of Object.keys(node.fields)) {
      node.fields[field].types = node.fields[field].types.filter(n => n.named)
    }
  }
  if (node.children) {
    node.children.types = node.children.types.filter(n => n.named)
  }
  if (node.subtypes) {
    node.subtypes = node.subtypes.filter(n => n.named)
  }
  return node
}

function processNodeTypes(nodeTypes: NodeType[]): Record<string, NodeType> {
  const filteredNodeTypes = nodeTypes
    .map(filterOutUnNamedNode)
    .filter(node => !!node)
  const nodeTypeMap = Object.fromEntries(
    filteredNodeTypes.map(node => [node.type, node]),
  )
  return nodeTypeMap
}

function readLangNodeTypes(dirname: string): NodeType[] {
  const staticNodePath = path.join(dirname, 'src', 'node-types.json')
  const content = fs.readFileSync(staticNodePath, 'utf-8')
  return JSON.parse(content)
}

function generateLangNodeTypes(setupConfig: SetupConfig) {
  const { name: lang, treeSitterPackage, dirname } = setupConfig
  try {
    const nodeTypes = readLangNodeTypes(dirname)
    const nodeTypeMap = processNodeTypes(nodeTypes)
    const fileContent =
      `// Auto-generated from ${treeSitterPackage}` +
      '\n' +
      `type ${lang}Types = ${JSON.stringify(nodeTypeMap, null, 2)};` +
      '\n' +
      `export default ${lang}Types;`
    fs.writeFileSync(path.join(dirname, 'type.d.ts'), fileContent)
  } catch (e) {
    console.error(`Error while generating node types for ${lang}`)
    throw e
  }
}
