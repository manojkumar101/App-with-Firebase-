import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
// export default firebaseApp.firestore();


// Following line added so that app doesnot break
// const firestore = firebaseApp.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// firestore.settings(settings);
// export default firestore;

const firestorage= firebaseApp.storage();
const firestore = firebaseApp.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

export default {
    firestorage,
    firestore
}