const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

// Define the URLs of the Flask services
const flaskServiceUrl = 'http://localhost:5001';

// Forward requests for '/api/query-tuition' to the Flask 'Mobile' namespace
app.use('/api/query-tuition', (req, res) => {
  console.log(`Incoming request to /api/query-tuition: ${req.method} ${req.url}`);
  proxy.web(req, res, { target: `${flaskServiceUrl}/Mobile/query-tuition` }, (err) => {
    console.error(`Error forwarding request to Flask service: ${err.message}`);
    res.status(500).send('Internal Server Error');  
  });
});

// Forward requests for '/api/pay-tuition' to the Flask 'Banking' namespace
app.use('/api/pay-tuition', (req, res) => { 
  console.log(`Incoming request to /api/pay-tuition: ${req.method} ${req.url}`);
  proxy.web(req, res, { target: `${flaskServiceUrl}/Banking/pay-tuition` }, (err) => {
    console.error(`Error forwarding request to Flask service: ${err.message}`);
    res.status(500).send('Internal Server Error');
  });
});

// Add middleware to log the request received by the proxy 
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  console.log(`Received request to ${options.target}: ${req.method} ${req.url}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
