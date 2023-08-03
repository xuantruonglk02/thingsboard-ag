const dotenv = require('dotenv');
const { initializeApp } = require('firebase/app');
const { child, getDatabase, onValue, ref } = require('firebase/database');
const { ConfigKeys } = require('./common/configKeys');
const {
    getDataAndTimestamp,
    log,
    pushToDevice,
} = require('./common/utinities');

dotenv.config();

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env[ConfigKeys.FIREBASE_API_KEY],
    authDomain: process.env[ConfigKeys.FIREBASE_AUTH_DOMAIN],
    databaseURL: process.env[ConfigKeys.FIREBASE_DATABASE_URL],
    projectId: process.env[ConfigKeys.FIREBASE_PROJECT_ID],
    storageBucket: process.env[ConfigKeys.FIREBASE_STORAGE_BUCKET],
    messagingSenderId: process.env[ConfigKeys.FIREBASE_MESSAGING_SENDER_ID],
    appId: process.env[ConfigKeys.FIREBASE_APP_ID],
    measurementId: process.env[ConfigKeys.FIREBASE_MEASUREMENT_ID],
});
const db = getDatabase();
const dbRef = ref(db);

exports.stream = (dataRef, fieldsMap, accessToken) =>
    onValue(child(dbRef, dataRef), (snapshot) => {
        if (snapshot.exists()) {
            const { data, timestamp } = getDataAndTimestamp(
                snapshot,
                fieldsMap
            );

            log(timestamp, data);

            pushToDevice(process.env[ConfigKeys.SERVER_DOMAIN], accessToken, {
                ts: timestamp,
                values: data,
            });
        } else {
            console.log('No data available');
        }
    });
