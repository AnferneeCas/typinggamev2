import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// const axios = require("axios").default;
const config = {
  apiKey: "AIzaSyAO7Opd3kKUYrHS32RfwXVJTcsv7BAzoxg",
  authDomain: "typinggamev2.firebaseapp.com",
  databaseURL: "https://typinggamev2.firebaseio.com/",
  storageBucket: "typinggamev2",
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }
  // random() {
  //   for (let index = 0; index < 100; index++) {
  //     setTimeout(() => {
  //       axios
  //         .get(
  //           "https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text"
  //         )
  //         .then((response) => {
  //           console.log(response);

  //           this.db
  //             .ref("quotes")
  //             .push({ text: response.data })
  //             .then((response) => {
  //               console.log("seguardo");
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.error();
  //         });
  //     }, 2000);
  //   }
  // }
}

export default new Firebase();
