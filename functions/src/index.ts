const express = require('express');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const functions = require('firebase-functions');
const server = express();
const apiForwardingUrl = "https://euw1.api.riotgames.com";
require('dotenv').config();
const headers= { 'X-Riot-Token': process.env.API_KEY };
// Logging
server.set('port',3000);
server.all("/lol/*", function(req: any, res: any) {
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/euw1/*", function(req: any, res: any) {
  req.url.replace('/euw1', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/br1/*", function(req: any, res: any) {
  req.url.replace('/br1', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/eun1/*", function(req: any, res: any) {
  req.url.replace('/eun1', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/jp1/*", function(req: any, res: any) {
  req.url.replace('/jp1', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/kr/*", function(req: any, res: any) {
  req.url.replace('/kr', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/la1/*", function(req: any, res: any) {
  req.url.replace('/la1', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/la2/*", function(req: any, res: any) {
  req.url.replace('/la2', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/oc1/*", function(req: any, res: any) {
  req.url.replace('/oc1', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/ru/*", function(req: any, res: any) {
  req.url.replace('/ru', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.all("/tr1/*", function(req: any, res: any) {
  req.url.replace('/tr1', '');
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false, headers: headers});
});
server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});
// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(server);

