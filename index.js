const fs = require('fs');
const http = require('http');
const url = require('url');

// TODO SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is PRODUCT');
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>Page not found!</h1>');
  }
  //
  res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});

// TODO FILE
// BLOCKING SYNCHRONOUS WAY
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log('CHECK  textIn =', textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreate on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// NON-BLOCKING ASYNC WAY
// fs.readFile('./txt/startTTT.txt', 'utf-8', (error, data1) => {
//   if (error) return console.log('ERROR!');
//   console.log('🚀CHECK  data1 =', data1);
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
//     console.log('🚀CHECK  data2 =', data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3) => {
//       console.log('🚀CHECK  data3 =', data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written!');
//       });
//     });
//   });
// });
// console.log('Will read file!');
