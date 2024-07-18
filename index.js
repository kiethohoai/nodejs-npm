const replaceTemplate = require('./modules/replaceTemplate');
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

// TODO SERVER
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCart = fs.readFileSync(`${__dirname}/templates/template.cart.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

console.log(slugify('My name is David Ho', { lower: true }));

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const pathname = url.parse(req.url).pathname;

  // todo Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cartHtml = dataObj.map((el) => replaceTemplate(tempCart, el)).join();
    const output = tempOverview.replace('{%PRODUCT_CART%}', cartHtml);
    res.end(output);

    // todo Product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // todo API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
    // todo Not found page
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>Page not found!</h1>');
  }

  res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
