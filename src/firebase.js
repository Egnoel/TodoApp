

  import firebase from 'firebase';

  const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyCr-C9NNq5iXeOEeNUS3YO9OSd_ebQeK_4",
    authDomain: "todo-app-blue.firebaseapp.com",
    projectId: "todo-app-blue",
    storageBucket: "todo-app-blue.appspot.com",
    messagingSenderId: "406527885941",
    appId: "1:406527885941:web:374e65ff6d6ca22831ae3c",
    measurementId: "G-QB5Q75NGLP"
  });

  const db = firebaseapp.firestore();

  export default db;