const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.fetchTickets = functions.https.onRequest(async (request, response) => {
  if (request.method !== "GET") {
    response.status(400).send("リクエストタイプが不正です。");
  }

  const query = request.query.doc;
  if (query === undefined) {
    response.status(400).send("クエリが不正です。");
  }
  try {
    const db = admin.firestore();
    const doc = await db.collection("tickets").doc(query).get(); // eslint-disable-line

    // const ticketsInfo = doc.data().email;
    const ticketsInfo = doc.data().email;
    response.send(ticketsInfo);
  } catch (e) {
    console.error(e);
    response.status(500).send(e);
  }
});

exports.printenvStripe = functions.https.onRequest((req, res) => {/* eslint-disable-line max-len */
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST");

  res.send(functions.config().stripe.apikey);
});
