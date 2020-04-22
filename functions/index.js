const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//Actualiza la lista de los numeros de vase de las cuentas de un cliente en especifico
exports.LobbyCreation = functions.database
  .ref("/games/{id}")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    console.log(original);
    console.log(context.authType);
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return true;
  });

//POST METHOD
exports.LobbyCreationHTTP = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    var data = JSON.parse(request.body);
    
    console.log(JSON.parse(request.body).arturo);
    console.log(request.params);
    response.send("test");
  }
  response.status(500).send({ error: "Something is not right!" });
});

//POST METHOD
exports.JoinLobbyHTTP = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    var data = JSON.parse(request.body);

    console.log(JSON.parse(request.body).arturo);
    console.log(request.params);
    response.send("test");
  }
  response.status(500).send({ error: "Something is not right!" });
});
