import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const scriptPath = join(__dirname, 'files', 'script.js')

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args])

  process.stdin.pipe(child.stdin)
  child.stdout.pipe(process.stdout)

  child.on('error', (error) => {
    console.error('Error from child process:', error)
  })

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`)
  })
}

spawnChildProcess(['someArgument1', 'someArgument2'])
