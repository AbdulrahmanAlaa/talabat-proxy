const proxy = require('express-http-proxy');
const { createServer } = require('https');
const {readFileSync} = require('fs');
const path = require('path');
const express = require('express');
const privateKey = readFileSync(path.resolve(__dirname, './ssl/server.key'), 'utf8');
const certificate = readFileSync(path.resolve(__dirname, './ssl/server.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/src'));
app.use(
  '/api',
  proxy('https://www.talabat.com/', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = `localhost:${port}`;
      return opts;
    }
  })
);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/index.html'));
});
createServer(credentials, app).listen(port, () => {
  console.log(`Node Express server listening on https://localhost:${port}`);
});
