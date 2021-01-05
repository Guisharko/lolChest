// const express = require('express');
// const cors = require('cors');
// const proxy = require('express-http-proxy');
// const functions = require('firebase-functions');
//
// const app = express();
// // Automatically allow cross-origin requests
// app.use(cors({ origin: true }));
//
//
// // app.use('/lol', proxy('https://euw1.api.riotgames.com'));
// app.get('*', (req : any, res : any) => {
//   res.set({
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET',
//     'Access-Control-Allow-Headers': 'Content-Type,Authorization'
//   });
//   res.send('Lol Chest App CORS');
//   return app(req, res);
// });
// app.use('/lol', proxy('https://euw1.api.riotgames.com', {
//   userResDecorator: function(req : any, res : any) {
//     let data;
//     data = JSON.parse(res.toString('utf8'));
//     data.newProperty = 'exciting data';
//     res.send('Lol Chest App PROXY');
//     return JSON.stringify(data);
//   }
// }));
// exports.widgets = functions.https.onRequest(app);

const express = require('express');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const createProxyMiddleware = require('http-proxy-middleware');
const functions = require('firebase-functions');
const server = express();
const apiForwardingUrl = "https://euw1.api.riotgames.com";

// Logging
server.set('port',3000);
server.all("/lol/*", function(req: any, res: any) {
  apiProxy.web(req, res, {target: apiForwardingUrl, changeOrigin: true, secure: false});
});
server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});
// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(server);

