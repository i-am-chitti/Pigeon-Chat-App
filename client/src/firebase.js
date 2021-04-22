import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCdXXJSrLzFA0IHSCbRU4o4INLPrU852QM",
    authDomain: "pigeon-chat-app-d3345.firebaseapp.com",
    projectId: "pigeon-chat-app-d3345",
    storageBucket: "pigeon-chat-app-d3345.appspot.com",
    messagingSenderId: "494699372087",
    appId: "1:494699372087:web:2587dadd8803089a2229b2"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;