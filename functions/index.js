const functions = require("firebase-functions");
const axios = require("axios").default;
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//Actualiza la lista de los numeros de vase de las cuentas de un cliente en especifico
exports.LobbyCreation = functions.database
  .ref("/lobbies/{id}")
  .onCreate(async (snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    let response = "";
    var quotes = await admin
      .database()
      .ref("quotes")
      .once("value", function (data) {
        var dataQuotes = data.val();
        response = Object.keys(dataQuotes).map((key) => {
          return dataQuotes[key];
        });

        console.log(response.length);
      });
    var random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    console.log(response[1].text);

    return snapshot.ref.update({
      quote: response[random].text,
    });

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  });

exports.countDown = functions.database
  .ref("/lobbies/{id}")
  .onUpdate(async (snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const data = snapshot.after.val();
    if (
      data.player1 !== undefined &&
      data.player2 !== undefined &&
      data.status === undefined
    ) {
      snapshot.after.ref
        .update({ status: "counting" })
        .then(async () => {
          var times = 0;
          var interval = setInterval(async () => {
            if (times < 3) {
              await snapshot.after.ref.update({ countDown: times });
              times++;
            } else {
              await snapshot.after.ref.update({ status: "playing" });
              clearInterval(interval);
            }
          }, 2000);
          return true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

// //POST METHOD
// exports.LobbyCreationHTTP = functions.https.onRequest((request, response) => {
//   if (request.method === "POST") {
//     var data = JSON.parse(request.body);

//     console.log(JSON.parse(request.body).arturo);
//     console.log(request.params);
//     response.send("test");
//   }
//   response.status(500).send({ error: "Something is not right!" });
// });

// //POST METHOD
// exports.JoinLobbyHTTP = functions.https.onRequest((request, response) => {
//   if (request.method === "POST") {
//     var data = JSON.parse(request.body);

//     console.log(JSON.parse(request.body).arturo);
//     console.log(request.params);
//     response.send("test");
//   }
//   response.status(500).send({ error: "Something is not right!" });
// });
