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
    await admin
      .database()
      .ref("countdown")
      .child(context.params.id)
      .set({ status: "counting" });
    await snapshot.ref.update({
      quote: response[random].text,
    });
    return true;

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  });

exports.countDown = functions.database
  .ref("/countdown/{id}")
  .onUpdate(async (snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const data = snapshot.after.val();
    if (
      data.player1 !== undefined &&
      data.player2 !== undefined &&
      data.countDown === undefined
    ) {
      snapshot.after.ref
        .update({ status: "counting" })
        .then(async () => {
          var times = 0;
          var interval = setInterval(async () => {
            if (times < 4) {
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

exports.queue = functions.database
  .ref("/queue/{id}")
  .onCreate(async (snapshot, context) => {
    var newPlayer = context.params.id;
    await admin
      .database()
      .ref("queue")
      .once("value", async (snapshot) => {
        var data = snapshot.val();
        data = Object.keys(data).map((key) => {
          var obj = data[key];
          obj.id = key;
          return obj;
        });

        if (data.length > 1) {
          var idplayer1 = "";
          var idplayer2 = "";
          for (let index = 0; index < data.length; index++) {
            if (data[index].status === undefined) {
              if (idplayer1 === "") {
                idplayer1 = data[index].id;
              } else if (idplayer2 === "") {
                idplayer2 = data[index].id;
              } else {
                break;
              }
            }
          }

          if (idplayer1 !== "" && idplayer2 !== "") {
            var result = await admin
              .database()
              .ref("lobbies")
              .push({ nombre: "matchmaking lobby" });

            await admin
              .database()
              .ref("queue")
              .child(idplayer1)
              .update({ status: "playing", lobbyId: result.key });

            setTimeout(async () => {
              await admin
                .database()
                .ref("queue")
                .child(idplayer2)
                .update({ status: "playing", lobbyId: result.key });
            }, 1500);
          }
          // await admin
          //   .database()
          //   .ref("lobbies")
          //   .push({ nombre: "matchmaking lobby" })
          //   .then(async (result) => {
          //     return await admin
          //       .database()
          //       .ref("queue")
          //       .child(data[0].id)
          //       .update({ lobbyId: result.key })
          //       .then(async () => {
          //         return await admin
          //           .database()
          //           .ref("queue")
          //           .child(data[1].id)
          //           .update({ lobbyId: result.key })
          //           .then(async () => {
          //             await admin
          //               .database()
          //               .ref("queue")
          //               .child(data[0].id)
          //               .remove();
          //             return await admin
          //               .database()
          //               .ref("queue")
          //               .child(data[1].id)
          //               .remove();
          //           });
          //       });
          //   });
        }
      });
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
// })
