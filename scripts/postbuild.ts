import { basename, dirname, resolve } from 'path'
import { copyFileSync, promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import chalk from 'chalk'

async function run() {
  const distDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
  // fix cjs exports
  const files = await fg('*.cjs', {
    ignore: ['chunk-*'],
    absolute: true,
    cwd: distDirectory,
  })
  for (const file of files) {
    console.log(chalk.cyan.inverse(' POST '), `Fix ${basename(file)}`)
    let code = await fs.readFile(file, 'utf8')
    code = code.replace('exports.default =', 'module.exports =')
    code += 'exports.default = module.exports;'
    await fs.writeFile(file, code)
  }

  const typesDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../src/types')
  // copy .d.ts
  const typingFiles = await fg('*.d.ts', {
    absolute: true,
    cwd: typesDirectory,
  })
  for (const file of typingFiles) {
    console.log(chalk.cyan.inverse(' POST '), `Copy ${basename(file)}`)
    copyFileSync(resolve(typesDirectory, file), resolve(distDirectory, basename(file)))
  }
}

run()
