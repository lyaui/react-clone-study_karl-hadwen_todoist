import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCAbGvxbkbx6leSOwUUMocyLkWw5fNHrIE',
  authDomain: 'todoist-b38d8.firebaseapp.com',
  projectId: 'todoist-b38d8',
  storageBucket: 'todoist-b38d8.appspot.com',
  messagingSenderId: '25968211907',
  appId: '1:25968211907:web:4e36834ece09cdf6a52f76',
};

firebase.initializeApp(firebaseConfig);
