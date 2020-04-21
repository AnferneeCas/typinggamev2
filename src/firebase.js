import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }
}

export default new Firebase();
