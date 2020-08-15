import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyCqmkTBmCvYrQayy48xwzzyAiA_SE-AbDo",
    authDomain: "encontreme-251ab.firebaseapp.com",
    databaseURL: "https://encontreme-251ab.firebaseio.com",
    projectId: "encontreme-251ab",
    storageBucket: "encontreme-251ab.appspot.com",
    messagingSenderId: "877330925035",
    appId: "1:877330925035:web:a69ab29657cdd5e3e6c5ae"
  };

 if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
 }

 export default firebase;