import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDPSLUchbojKkZQI2oMLa5eUB67Qyyg65w',
        authDomain: 'toilet-wall.firebaseapp.com',
        projectId: 'toilet-wall'
});

const db = firebaseApp.firestore();

export { db };