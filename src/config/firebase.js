import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyD7w0IGCDI_QEkVp531XE-XXKV_z48_Uqo",
    authDomain: "rtpba-125.firebaseapp.com",
    databaseURL: "https://rtpba-125.firebaseio.com",
    projectId: "rtpba-125",
    storageBucket: "rtpba-125.appspot.com",
    messagingSenderId: "609357794186"
  };

  firebase.initializeApp(config);

export default firebase;