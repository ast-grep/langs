import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import prompts from 'prompts'

function required(s: string): string | true {
  if (s.length === 0) {
    return 'This value is required'
  }
  return true
}

// https://github.com/vitejs/vite/blob/76082e3d3033b09b02b6db64de6e36942593c753/packages/create-vite/src/index.ts#L557
function isValidPackageName(projectName: string) {
  return (
    /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
      projectName,
    ) || 'Invalid package name'
  )
}

function askConfiguration() {
  return prompts(
    [
      {
        type: 'text',
        name: 'name',
        message: 'Language name',
        validate: required,
      },
      {
        type: 'text',
        name: 'packageName',
        message: 'Package name',
        validate: isValidPackageName,
        initial: (_, answers) => `my-dynamic-lang-${answers.name}`,
      },
      {
        type: 'text',
        name: 'treeSitterPackage',
        message: 'Tree-sitter package to use',
        validate: isValidPackageName,
        initial: (_, answers) => `tree-sitter-${answers.name}`,
      },
      {
        type: 'list',
        name: 'extensions',
        message: 'File extensions used by the language, comma separated',
        separator: ',',
        validate: required,
      },
      {
        type: 'text',
        name: 'expandoChar',
        message: 'Expando char used in pattern',
        initial: '$',
        validate: value => {
          return value.length === 1
            ? true
            : 'Expando char must be a single character'
        },
      },
      {
        type: 'confirm',
        name: 'includeDotFiles',
        message: 'Include gitignore and npm publish files?',
        initial: true,
      },
    ],
    {
      onCancel: () => {
        process.exit(1)
      },
    },
  )
}

type Answers = Awaited<ReturnType<typeof askConfiguration>>

function copyTemplate(targetDir: string, includeDotFiles: boolean) {
  const templateDir = path.join(__dirname, 'template')
  return fs.cp(templateDir, targetDir, {
    recursive: true, // Copy all files and folders
    // includes hidden files if `includeDotFiles` is true
    filter: src => {
      const basename = path.basename(src)
      return includeDotFiles || !basename.startsWith('.')
    },
  })
}

async function renameFiles(dir: string, answer: Answers) {
  const name: Record<string, string> = {
    $$PACKAGE_NAME$$: answer.packageName,
    $$NAME$$: answer.name,
    $$TREE_SITTER_PACKAGE$$: answer.treeSitterPackage,
    $$EXTENSIONS$$: JSON.stringify(answer.extensions),
    $$EXPANDO_CHAR$$: answer.expandoChar,
  }
  for (const file of await fs.readdir(dir)) {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      renameFiles(filePath, answer)
    } else {
      const content = await fs.readFile(filePath, 'utf-8')
      const newContent = content.replace(/(\$\$[A-Z_]+\$\$)/g, match => {
        return name[match] || match
      })
      await fs.writeFile(filePath, newContent)
    }
  }
}
function installTreeSitterPackage(cwd: string, answer: Answers) {
  console.log('Installing tree-sitter package...')
  execSync(`pnpm install ${answer.treeSitterPackage} --save-dev --save-exact`, {
    cwd,
  })
  console.log('Copying source code...')
  execSync('pnpm run source', { cwd })
  console.log('Compiling')
  execSync('pnpm run build', { cwd })
}

async function main() {
  let cwd = process.cwd()
  if (process.argv.length > 2) {
    const targetDir = process.argv[2]
    cwd = path.join(cwd, targetDir)
  }
  const config = await askConfiguration()
  await copyTemplate(cwd, config.includeDotFiles)
  await renameFiles(cwd, config)
  installTreeSitterPackage(cwd, config)
}

main()
