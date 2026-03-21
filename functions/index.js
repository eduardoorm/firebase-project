/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");
const functions = require("firebase-functions");

exports.holaMundo = functions.https.onRequest((req, res) => {
  res.json({
    mensaje: "Hola desde Firebase",
  });
});

setGlobalOptions({ maxInstances: 10 });
