import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const axios = require("axios").default;
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_UR,
  storageBucket: process.env.REACT_APP_PROJECT_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }
  random() {
    for (let index = 0; index < 100; index++) {
      setTimeout(() => {
        axios
          .get(
            "https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text"
          )
          .then((response) => {
            console.log(response);

            this.db
              .ref("quotes")
              .push({ text: response.data.replace(/\s\s+/g, " ") })
              .then((response) => {
                console.log("seguardo");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.error();
          });
      }, 2000);
    }
  }
}

export default new Firebase();
