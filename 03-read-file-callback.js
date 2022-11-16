const fs = require('fs')
const fileName = '03-read-file-callback.js'
fs.readFile(fileName,(err,fileData) => {
    if(err) return console.error(err)
    console.log(`FileName = ${fileName} : FileLength = ${fileData.length}`)
})