const fs = require('fs')
const http = require('http')
const url = require('url') //routing

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const laptopData = JSON.parse(json) // goes from json to javascript object


const server = http.createServer((req,res)=>{
  // this is a header for the res.end response
  const pathName = url.parse(req.url, true).pathname // true, so the query is parsed into an object

  res.writeHead(200, {'Content-type': 'text/html '})
  res.end ('this is the response')
}) 

server.listen(1337, '127.0.0.1', ()=>{
  console.log('listening for request')
})

