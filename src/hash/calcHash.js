import fs from 'node:fs'
import crypto from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileToHash = join(__dirname, 'files', 'fileToCalculateHashFor.txt')
const hash = crypto.createHash('sha256')

const calculateHash = async () => {
  const stream = fs.createReadStream(fileToHash)
  stream.on('data', (data) => hash.update(data))
  stream.on('error', (err) => console.error(err.message))
  stream.on('end', () => {
    const result = hash.digest('hex')
    console.log(result)
  })
}

await calculateHash()
