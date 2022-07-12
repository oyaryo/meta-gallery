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

exports.getStripeKey = functions.https.onCall((data, context) => {
  if (functions.config().stripe.apikey) {
    return functions.config().stripe.apikey;
  } else {
    return "Not Found API Key.";
  }
});

exports.hello = functions.https.onRequest((request, response) => {
  response.send(`Hello: ${process.env.STRIPE_PUBLISHABLE_KEY}`);
});
