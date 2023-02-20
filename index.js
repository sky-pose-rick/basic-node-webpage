const http = require('http');
const url = require('url');
const fs = require('fs/promises');

http.createServer(async function(req,res){
  // parse url object
  var q = url.parse(req.url, true);
  const filename = `.${(q.pathname === '/' ? '/index': q.pathname)}.html`;
  try{
    const data = await fs.readFile(filename, 'utf8');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write(data);
    res.end();
  } catch(err){
    res.writeHead(404, {'Content-Type' : 'text/html'});
    const data = await fs.readFile('404.html', 'utf-8');
    res.write(data);
    res.end();
  }
}).listen(8081);
