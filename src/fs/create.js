import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = join(__dirname, 'files', 'fresh.txt')
const content = 'I am fresh and young'

const create = async () => {
  try {
    await fs.access(filePath)
    throw new Error('FS operation failed')
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(filePath, content, 'utf8')
      console.log('File created successfully')
    } else {
      throw err
    }
  } 
}

await create().catch(err => console.error(err.message));