const multer = require('multer');
const util = require("util");
const maxSize = 2 * 1024 * 1024;

const MIME_TYPES = {
    'application/PDF': 'pdf',
    'application/pdf': 'pdf'
}

const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, 'articleDoc')
    },
   
    filename: (req, file, callback)=>{
        const fullName=file.originalname.split('.').splice(0,1)
        const name = fullName[0].split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name +'_'+ Date.now() + '.' + extension);
    }
});
var upload = multer({
    storage: storage,
   
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "application/pdf"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .pdf format allowed!"));
      }
    },
    limits: { fileSize: maxSize },
  }).single('articleDoc');
  
module.exports = upload;