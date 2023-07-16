const multer = require('multer');
const util = require("util");
const maxSize = 2 * 1024 * 1024;

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/JPG': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, 'images')
    },
   
    filename: (req, file, callback)=>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      console.log(file)
      console.log(file.mimetype)
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
    limits: { fileSize: maxSize },
  }).single('image');
  
module.exports = upload;