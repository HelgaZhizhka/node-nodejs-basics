import { createWriteStream, createReadStream } from 'node:fs'
import { createGzip } from 'node:zlib'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputFile = join(__dirname, 'files', 'fileToCompress.txt')
const outputFile = join(__dirname, 'files', 'archive.gz')
const pipe = promisify(pipeline)

const compress = async () => {
  const gzip = createGzip()
  const source = createReadStream(inputFile)
  const destination = createWriteStream(outputFile)

  try {
    await pipe(source, gzip, destination)
    console.log('Compression succeeded.')
  } catch (err) {
    console.error('Compression failed:', err)
  }
}

await compress().catch((err) => {
  console.error('An error occurred:', err)
  process.exitCode = 1
})
