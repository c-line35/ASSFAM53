const express = require ('express');
const router = express.Router();
const booksCtrl = require('../controllers/books')
const auth = require('../middleware/auth');
const multerBookImage = require('../middleware/multerBookImage.config');


router.post("", auth, multerBookImage, booksCtrl.createbook);
router.get("", booksCtrl.getAllBooks); 
router.get("/:id", auth, booksCtrl.getOneBook)
router.put("/:id", auth, multerBookImage, booksCtrl.updatebook);
router.put("/:bookId/:userId", auth, booksCtrl.updateLike);
router.delete('/:id', auth, booksCtrl.deleteBook) 


module.exports = router;