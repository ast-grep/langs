import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Log to console
 */
function log(...args: unknown[]) {
  console.debug('@ast-grep/lang:', ...args)
}

interface SetupConfig {
  /** Directory of the lang package. e.g. __dirname */
  dirname: string
}

/**
 * Move prebuild or build parser
 */
function postinstall(config: SetupConfig) {
  const dir = config.dirname
  const prebuild = resolvePrebuild(dir, true)
  if (prebuild) {
    log('prebuild found, do not need to build')
    return
  }
  try {
    buildSrc(config)
  } catch (e: unknown) {
    log(
      'build failed, please ensure tree-sitter-cli is installed as peer dependency',
    )
    log(e)
  }
}

function buildSrc(config: SetupConfig) {
  const { dirname } = config
  const existing = path.join(dirname, 'src')
  if (!fs.existsSync(existing)) {
    log(
      'tree-sitter src not found. If you are making a lang package, please run `pnpm source`.',
    )
    return
  }
  log('building parser from source')
  execSync('npm run build')
}

const PLATFORM_MAP: Record<string, string> = {
  darwin: 'macOS',
  linux: 'Linux',
  win32: 'Windows',
}

const ARCH_MAP: Record<string, string> = {
  x64: 'X64',
  arm64: 'ARM64',
}

/**
 * Resolve prebuild path
 */
function resolvePrebuild(dir: string, needLog = false) {
  const os = PLATFORM_MAP[process.platform]
  const arch = ARCH_MAP[process.arch]
  const prebuild = path.join(
    dir,
    'prebuilds',
    `prebuild-${os}-${arch}`,
    'parser.so',
  )
  if (!os || !arch || !fs.existsSync(prebuild)) {
    if (needLog) {
      log(`no prebuild for ${os} ${arch}`)
    }
    return undefined
  }
  if (needLog) {
    log(`found prebuild for ${os} ${arch}`)
  }
  return prebuild
}

export { postinstall, resolvePrebuild }
