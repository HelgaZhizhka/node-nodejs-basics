import fs from 'fs/promises'
import crypto from 'crypto'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileToHash = join(__dirname, 'files', 'fileToCalculateHashFor.txt')
const hash = crypto.createHash('sha256')

const calculateHash = async () => {
  const stream = fs.createReadStream(fileToHash)
  stream.on('data', (data) => hash.update(data))
  stream.on('end', () => {
    const result = hash.digest('hex')
    console.log(result)
  })
}

await calculateHash()
