import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


  const firebaseConfig = {
    apiKey: "AIzaSyA-fo648HeZTqDOR4eKzI0nOCk2JdCMxmg",
    authDomain: "photoapp-f9e50.firebaseapp.com",
    projectId: "photoapp-f9e50",
    storageBucket: "photoapp-f9e50.appspot.com",
    messagingSenderId: "16404813897",
    appId: "1:16404813897:web:1349b46969b79ac4660798"
  };

  firebase.initializeApp(firebaseConfig);

  const firestore = firebase.firestore();

 const storage = firebase.storage();
  export { storage, firestore };