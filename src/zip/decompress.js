import { createReadStream, createWriteStream } from 'node:fs'
import { createGunzip } from 'node:zlib'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputFile = join(__dirname, 'files', 'archive.gz')
const outputFile = join(__dirname, 'files', 'fileToCompress.txt')
const pipe = promisify(pipeline)

const decompress = async () => {
  const gunzip = createGunzip()
  const source = createReadStream(inputFile)
  const destination = createWriteStream(outputFile)

  try {
    await pipe(source, gunzip, destination)
    console.log('Decompression succeeded.')
  } catch (err) {
    console.error('Decompression failed:', err)
  }
}

await decompress().catch((err) => {
  console.error('An error occurred:', err)
  process.exitCode = 1
})
