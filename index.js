const fs = require('fs/promises');
const express = require('express');
const app = express();
const port = 3000;

app.use('/img', express.static('img'));

const displayPage = async (filename, res) =>{
  try{
    const data = await fs.readFile(filename, 'utf8');
    res.send(data);
  } catch(err){
    res.status(404);
    const data = await fs.readFile('404.html', 'utf-8');
    res.send(data);
  }
}

app.get('/', (req,res) => {
  res.status(200);
  displayPage('index.html', res);
});

app.get('/contact-me', (req,res) => {
  res.status(200);
  displayPage('contact-me.html', res);
});

app.get('/about', (req,res) => {
  res.status(200);
  displayPage('about.html', res);
});

app.get('*', (req,res) => {
  res.status(404);
  displayPage('404.html', res);
});

app.listen(port, ()=>{
  console.log('Now listening on port ', port);
})
