const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const functions = require('firebase-functions');
app.get('*', (req : any, res : any) => {
  res.send('hello world');
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
});
});

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
