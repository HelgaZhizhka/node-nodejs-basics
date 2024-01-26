import { Worker } from 'node:worker_threads'
import os from 'node:os'

const performCalculations = async () => {
  const numberOfCores = os.cpus().length
  const promises = []

  for (let i = 0; i < numberOfCores; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        const worker = new Worker('./src/wt/worker.js')
        worker.postMessage(10 + i)

        worker.on('message', (result) => {
          resolve({ status: 'resolved', data: result })
        })

        worker.on('error', reject)
        worker.on('exit', (code) => {
          if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`))
          process.exit(code)
        })
      })
    )
  }

  const results = await Promise.allSettled(promises)
  console.log(results)
}

await performCalculations()
