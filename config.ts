// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDyst8TgWxebQ0lJ1ihkIOpxBFwJoetSGw",
//   authDomain: "bodypumplist.firebaseapp.com",
//   projectId: "bodypumplist",
//   storageBucket: "bodypumplist.appspot.com",
//   messagingSenderId: "614447143643",
//   appId: "1:614447143643:web:7d9f08a33b440b9082cafe"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
import { Config, Environment } from './types';

const { BUILD_VERSION, COMMIT_SHA, ENVIRONMENT, PROJECT_ID } = process.env;

const config: Config = {
  name: 'bodyPumpList',
  port: process.env.PORT || 9006,
  logLevel: 'info',
  projectId: PROJECT_ID || 'bodypumplist',
};

export default config;
