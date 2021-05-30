import multer from 'multer';
import util from 'util';
import path from 'path'

const maxSize = 2 * 1024 * 1024;

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, makeid(10) + path.extname(file.originalname).toLocaleLowerCase());
    }
})

let uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
}).single("file");

export const uploadMiddleware = util.promisify(uploadFile);

