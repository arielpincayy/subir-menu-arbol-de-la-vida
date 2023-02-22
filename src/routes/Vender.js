const express = require('express');
const multer  = require('multer');

const app = express.Router();
const { saveProduct, generateUUID, uploadString, ref, storageFb } = require('./firebase');
const { readFile, removeFile, storage, optimizeImg } = require('../driver-img/upload-img');


const upload = multer({ storage });

app.get('/',(req,res)=>{
    res.render('vender');
});

app.post('/', upload.single('file'),async(req,res) => {
    const { seccion, nombre, precio, descripcion } = req.body;
    const idCard = generateUUID();
    const nameFile = req.file.filename;
    const descripcionArr = descripcion.split(',');
    let arrN = nameFile.split('.');
    arrN.pop();
    await optimizeImg(`./files/${nameFile}`,arrN.join('.'));
    const code = await readFile(arrN.join('.'));
    const storageRef = ref(storageFb, `menu-imgs/${idCard}.webp`);
    uploadString(storageRef, code, 'base64').then((snapshot) => {
      let nameImg =idCard+".webp";
      removeFile(nameFile, 'files');
      removeFile(`${arrN.join('.')}.webp`, 'optimize');
      saveProduct(seccion,nombre,precio,descripcionArr,nameImg,idCard);
      console.log('Uploaded a base64 string!');
    });
    res.redirect('/');
});
  

module.exports = app;