const multer  = require('multer');
const fs = require('fs/promises');
const sharp = require('sharp');


function removeFile(nameFile, folder){
    fs.unlink(`./${folder}/${nameFile}`) .then(() => {
    console.log('File removed');
  }).catch(err => {
    console.error('Something wrong happened removing the file', err);
  });
}

function optimizeImg(filePath, filename){
    const newRout = sharp(filePath)
    .resize(300, 300)
    .toFile(`./optimize/${filename}.webp`);
    return newRout;
} 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      let arrName = file.originalname.split('.');
      let name =`${arrName[0]}${uniqueSuffix}.${arrName[arrName.length-1]}`;
      cb(null, name);
    }
  });

function readFile(nameFile){
    const code = fs.readFile( `./optimize/${nameFile}.webp`,{encoding:'base64'});
    return code;
}

module.exports={
    removeFile,
    storage,
    readFile,
    optimizeImg
}