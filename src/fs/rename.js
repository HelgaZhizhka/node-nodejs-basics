 import fs from 'сfs/promises'
 import { dirname, join } from 'node:path'
 import { fileURLToPath } from 'node:url'

 const __dirname = dirname(fileURLToPath(import.meta.url))
 const srcFile = join(__dirname, 'files', 'wrongFilename.txt')
 const destFile = join(__dirname, 'files', 'properFilename.md')

 const rename = async () => {
   try {
     await fs.access(srcFile)
     try {
       await fs.access(destFile)
       throw new Error('FS operation failed: properFilename.md already exists')
     } catch (err) {
       if (err.code === 'ENOENT') {
         await fs.rename(srcFile, destFile)
         console.log('File renamed successfully')
       } else {
         throw err
       }
     }
   } catch (err) {
     console.error('FS operation failed:', err.message)
   }
 }

 await rename()