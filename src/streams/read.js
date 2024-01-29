import { createReadStream } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileToRead = join(__dirname, 'files', 'fileToRead.txt')

const read = async () => {
  const stream = createReadStream(fileToRead)
  stream.on('data', (data) => process.stdout.write(`${data.toString()}\n`))
  stream.on('error', (err) => console.error(err.message))
}

await read()
