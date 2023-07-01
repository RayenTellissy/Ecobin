require("dotenv").config()
const { initializeApp } = require("firebase/app")
const { getStorage } = require("firebase/storage")

// firebase config with secret variables
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

const app = initializeApp(firebaseConfig) // initializing a firebase app to call in controllers
const storage = getStorage(app) // getting a firebase storage instance

module.exports = { app, storage }