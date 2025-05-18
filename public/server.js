// server.js
const http = require('http');

const hostName = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;   
  res.setHeader('Content-Type', 'application/json')
  console.log('User Attempting to hit API');
  const output = {
    phrase: 'Hello World',
  };
  res.write(JSON.stringify(output));
  res.end();

});
 

server.listen(port, hostName, () => {
  console.log('Server running at http://localhost:3000');
});