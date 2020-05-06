const fs = require('fs')
const http = require('http')
const url = require('url') //routing

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const laptopData = JSON.parse(json) // goes from json to javascript object


const server = http.createServer((req,res)=>{
  // this is a header for the res.end response
  const pathName = url.parse(req.url, true).pathname // true, so the query is parsed into an object, ROUTING

  if(pathName === '/products' || pathName === '' ){
    res.writeHead(200, {'Content-type': 'text/html '})
    res.end ('this is the products page')
  } 
  
  else if (pathName === '/laptop'){
     res.writeHead(200, {'Content-type':'text/html'})
     res.end(`this is the laptop's page`)
  }
  else {
    res.writeHead(400, {'Content-type': 'text/html'})
    res.end('Url was not found on the server')
  }

}) 

server.listen(1337, '127.0.0.1', ()=>{
  console.log('listening for request')
})

