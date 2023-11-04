const express = require ('express');
const router = express.Router();
const booksCtrl = require('../controllers/books')
const auth = require('../middleware/auth');
const multerBookImage = require('../middleware/multerBookImage.config');


router.post("", auth, multerBookImage, booksCtrl.createbook);
/* router.get("", articleCtrl.getAllArticles);
router.put("/:id", auth, multerImage, articleCtrl.updateArticle);
router.put("/doc/:id", auth, multerArticleDoc,articleCtrl.addDoc); 
router.put("/doc/delete/:id", auth, multerArticleDoc,articleCtrl.deleteDoc); 
router.put("/lien/:id", auth, articleCtrl.addLink); 
router.delete('/:id', auth, multerImage, articleCtrl.deleteArticle) */

module.exports = router;