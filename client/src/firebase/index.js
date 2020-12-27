import firebase from 'firebase/app';
import "firebase/storage"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL4ynjYazbPOI1vrSKwg133Kasv5Rg-V0",
  authDomain: "cakedilemma.firebaseapp.com",
  projectId: "cakedilemma",
  storageBucket: "cakedilemma.appspot.com",
  messagingSenderId: "676720803302",
  appId: "1:676720803302:web:531ce7da2cb6c9a8682a27",
  measurementId: "G-0WCE28D5WW"
};
  
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export {storage, firebase as default };