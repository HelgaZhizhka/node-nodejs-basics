import fs from 'node:fs/promises'
import { constants } from 'node:fs'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, 'files')
const destDir = join(__dirname, 'files_copy')

const copy = async () => {
  try {
    await fs.access(srcDir, constants.F_OK)

    try {
      await fs.access(destDir, constants.F_OK)
      throw new Error('FS operation failed: files_copy already exists')
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
    }

    await fs.mkdir(destDir, { recursive: true })

    const files = await fs.readdir(srcDir, { withFileTypes: true })

    for (const file of files) {
      const srcFile = join(srcDir, file.name)
      const destFile = join(destDir, file.name)
      console.log(srcFile, destFile)
      await fs.cp(srcFile, destFile , { recursive: true, force: false })
    }

    console.log('Files copied successfully')
  } catch (err) {
    console.error(err.message)
  }
}

await copy()