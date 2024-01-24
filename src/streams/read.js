import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileToRead = join(__dirname, 'files', 'fileToRead.txt')

const read = async () => {
  const stream = fs.createReadStream(fileToRead)
  stream.on('data', (data) => console.log(data.toString()))
  stream.on('error', (err) => console.error(err.message))
  stream.on('end', () => console.log('File read successfully'))
}

await read()
