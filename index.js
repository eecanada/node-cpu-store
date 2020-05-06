const fs = require('fs')
const http = require('http')

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const laptopData = JSON.parse(json)

console.log(laptopData)


const server = http.createServer((req,res)=>{
  // this is a header for the res.end response
  res.writeHead(200, {'Content-type': 'text/html '})
  res.end ('this is the response')
}) 

server.listen(1337, '127.0.0.1', ()=>{
  console.log('listening for request ')
})

