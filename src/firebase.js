import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


  const firebaseConfig = {
    //YOUR FIREBASE CONFIGURATIONS
  };

  firebase.initializeApp(firebaseConfig);

  const firestore = firebase.firestore();

 const storage = firebase.storage();
  export { storage, firestore };
