const fs = require('fs')
const http = require('http')
const url = require('url') //routing

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8') //grabing my json data
const laptopData = JSON.parse(json) // goes from json to javascript object


const server = http.createServer((req,res)=>{
  // this is a header for the res.end response
  const pathName = url.parse(req.url,true).pathname // true, so the query is parsed into an object, ROUTING
  const id  = url.parse(req.url,true).query.id //query id from url



  if(pathName === '/products' || pathName === '' ){
    res.writeHead(200, {'Content-type': 'text/html'})
    fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8', (err, data)=>{
      let overviewOutput = data
      fs.readFile(`${__dirname}/templates/template-card.html`,'utf-8', (err, data)=>{
        const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('')
        overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)
        res.end(overviewOutput)
     })
      
   })
    
  } 
  
  else if (pathName === '/laptop' && id < laptopData.length){
     res.writeHead(200, {'Content-type':'text/html'})
     fs.readFile(`${__dirname}/templates/template-laptop.html`,'utf-8', (err, data)=>{
        const laptop = laptopData[id]
        const output = replaceTemplate(data, laptop)
        res.end(output)
     })
  }
  else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
    fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data)=>{
      res.writeHead(200, {'Content-type':'image/jpg'})
      res.end(data) 
    })
  }
  else {
    res.writeHead(400, {'Content-type': 'text/html'})
    res.end('Url was not found on the server')
  }

}) 

server.listen(1337, '127.0.0.1', ()=>{
  console.log('listening for request')
})


function replaceTemplate(originalHtml,laptop){
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName) 
  output = output.replace(/{%IMAGE%}/g, laptop.image)
  output = output.replace(/{%PRICE%}/g, laptop.price)
  output = output.replace(/{%SCREEN%}/g, laptop.screen)
  output = output.replace(/{%CPU%}/g, laptop.cpu)
  output = output.replace(/{%STORAGE%}/g, laptop.storage)
  output = output.replace(/{%RAM%}/g, laptop.ram) 
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description)
  output = output.replace(/{%ID%}/g, laptop.id)
  return output
}