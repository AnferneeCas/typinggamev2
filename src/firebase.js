import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
}

export default new Firebase();
