import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileToWrite = join(__dirname, 'files', 'fileToWrite.txt')

const write = async () => {
  const writeStream = fs.createWriteStream(fileToWrite)
  process.stdin.on('data', (data) => {
    writeStream.write(data)
  })
  writeStream.on('finish', () => {
    console.log('File written successfully')
  })
  writeStream.on('error', (error) => {
    console.error('Error writing file:', error)
  })

  process.stdin.on('error', (error) => {
    console.error('Error reading input:', error)
  })
  process.on('SIGINT', () => {
    writeStream.end()
    process.exit()
  })
}

await write()
