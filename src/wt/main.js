import { Worker } from 'node:worker_threads'
import os from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileWorker = join(__dirname, 'worker.js')
const START_INT = 10

const performCalculations = async () => {
  const numberOfCores = os.cpus().length
  const promises = []

  for (let i = 0; i < numberOfCores; i++) {
    const worker = new Worker(fileWorker, { workerData: START_INT + i })

    promises.push(
      new Promise((resolve, reject) => {
        worker.on('message', (result) => {
          resolve({ status: 'resolved', data: result })
          worker.terminate()
        })

        worker.on('error', (err) => {
          resolve({ status: 'rejected', data: err.message })
        })
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`))
          }
        })
      })
    )
  }

  const results = await Promise.allSettled(promises)
  console.log(results)
}

await performCalculations()
