import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt')

const remove = async () => {
  try {
    await fs.access(fileToRemove)
    await fs.rm(fileToRemove)
    console.log('File removed successfully')
  } catch (err) {
    console.error('FS operation failed:', err.message)
  }
}

await remove()