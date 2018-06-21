import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCFIJA52GrQcz5X71vwO37sxBjubIoZUHA",
  authDomain: "catch-of-the-day-yin.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-yin.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;