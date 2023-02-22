// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadString} = require('firebase/storage');
const { collection,getFirestore, addDoc} = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "a-fuego-lento-58032.firebaseapp.com",
    projectId: "a-fuego-lento-58032",
    storageBucket: "a-fuego-lento-58032.appspot.com",
    messagingSenderId: "437062711642",
    appId: "1:437062711642:web:ebbd5ac9e7de858f859b63",
    measurementId: "G-YVHKEDXE5K"
  };
  
// Initialize Firebase

initializeApp(firebaseConfig);

const db = getFirestore();
const storageFb = getStorage();

const saveProduct=(seccion,nombre,precio,descripcion,nameImg,idCard)=>
addDoc(collection(db, "menu"), {seccion,nombre,precio,descripcion,nameImg,idCard});


const generateUUID=()=>{
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


module.exports={
    saveProduct,
    generateUUID,
    uploadString,
    ref,
    storageFb,
}