const { setGlobalOptions } = require("firebase-functions");
const functions = require("firebase-functions");
const express = require("express");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

const app = express();
app.use(express.json());
initializeApp();

app.get("/users", (req, res) => {
  res.json({
    message: "Hola mundo",
  });
});

app.post("/user", (req, res) => {
  const data = req.body;
  res.json({
    datos: data,
  });
});

app.put("/user", (req, res) => {
  const data = req.body;
  res.json({
    datos: data,
  });
});

app.delete("/user", (req, res) => {
  const data = req.body;
  res.json({
    datos: data,
  });
});

exports.api = functions.https.onRequest(app);

exports.createUser = functions.https.onRequest(async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userRecord = await getAuth().createUser({ email, password });

    await getFirestore()
      .collection("users")
      .doc(userRecord.uid)
      .set({
        email: userRecord.email,
        createdAt: new Date(),
        name: name || "Eduardo",
        role: "User",
      });

    res.json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

exports.onUserDocCreated = onDocumentCreated("users/{id}", (event) => {
  const data = event.data.data();
  console.log("nuevo documento", data);
});

setGlobalOptions({ maxInstances: 10 });
