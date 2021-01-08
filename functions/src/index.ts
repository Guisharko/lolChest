const express = require('express');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const functions = require('firebase-functions');
const server = express();
const apiForwardingUrl = "https://euw1.api.riotgames.com";
require('dotenv').config();
// Logging
server.set('port',3000);
server.all("/lol/*", function(req: any, res: any) {
  const headers= { 'X-Riot-Token': process.env.API_KEY };
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});

server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});
// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(server);

