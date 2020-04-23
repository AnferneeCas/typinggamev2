import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  storageBucket: process.env.REACT_APP_PROJECT_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
    // this.status = {
    //   waiting: 0,
    //   started: 1,
    //   finished: 2,
    // };
  }

  async queuePlayer(player) {
    await this.db
      .ref("queue/")
      .push({
        name: player,
      })
      .then((res) => {
        res.ref.onDisconnect().remove();
      })
      .catch((e) => {
        alert(e);
      });
  }
}

export default new Firebase();
