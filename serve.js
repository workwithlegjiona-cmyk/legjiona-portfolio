// Tiny static server for local preview: node serve.js  ->  http://localhost:5178 (also reachable from phones on the same Wi-Fi)
const http = require('http'), fs = require('fs'), path = require('path');
const T = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
http.createServer((q, r) => {
  console.log(new Date().toISOString().slice(11, 19), q.socket.remoteAddress, q.method, q.url);
  let p = decodeURIComponent(q.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(__dirname, p);
  if (!f.startsWith(__dirname)) { r.writeHead(403); return r.end(); }
  fs.readFile(f, (e, d) => {
    if (e) {
      r.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      return r.end('404 - nuk u gjet: ' + p + '\nHap: http://' + q.headers.host + '/');
    }
    r.writeHead(200, {'Content-Type': T[path.extname(f).toLowerCase()] || 'application/octet-stream'});
    r.end(d);
  });
}).listen(5178, '0.0.0.0', () => console.log('http://localhost:5178'));
