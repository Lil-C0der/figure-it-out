const http = require('http');
const urlParser = require('url');
const queryString = require('querystring');

const server = http.createServer();

server.on('request', (request, response) => {
  const { url, method, headers } = request;
  // 获取 url 中携带的数据
  const params = urlParser.parse(url);
  const queryObj = queryString.parse(params.query);
  const responseHeaders = {
    'Content-Type': 'application/json',
    // CORS
    'Access-Control-Allow-Origin': '*'
  };

  if (method === 'POST') {
    let body = [];
    request
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const responseBody = { method, url, headers, body };
        response.writeHead(200, responseHeaders);
        response.write(JSON.stringify(responseBody));
        response.end();
      });
  }
  if (method === 'GET') {
    const data = queryObj;
    data.key = queryObj.key + queryObj.username;
    data.greeting = `hello ${data.username}, your key is ${data.key}`;
    // jsonp
    if (queryObj.cb) {
      // 拼接前端传的 callback，并作为 body 响应
      str = `${queryObj.cb}(${JSON.stringify(data)})`;
      response.writeHead(200, responseHeaders);
      return response.end(str);
    }
    const responseBody = { url, method, headers, data };

    response.writeHead(200, responseHeaders);
    response.write(JSON.stringify(responseBody));
    response.end();
  }
});

server.listen('8080').on('listening', () => {
  console.log('server is running at port 8080');
});
