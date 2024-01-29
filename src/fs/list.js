import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const filesDir = join(__dirname, 'files')

const list = async () => {
  try {
    const files = await fs.readdir(filesDir)
    console.log(files)
  } catch (err) {
    console.error('FS operation failed:', err.message)
  }
}

await list()