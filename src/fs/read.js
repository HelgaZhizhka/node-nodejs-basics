import fs from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileToRead = join(__dirname, 'files', 'fileToRead.txt')

const read = async () => {
  try {
    const content = await fs.readFile(fileToRead, 'utf8')
    console.log(content)
  } catch (err) {
    console.error('FS operation failed:', err.message)
  }
}

await read()