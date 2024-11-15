const express = require ('express');
const router = express.Router();
const articleCtrl = require('../controllers/article')
const auth = require('../middleware/auth');
const multerImage = require('../middleware/multer.config');
const multerArticleDoc = require('../middleware/multerArticleDoc.config');

router.post("", auth, multerImage, articleCtrl.createArticle);
router.get("", articleCtrl.getAllArticles);
router.put("/:id", auth, multerImage, articleCtrl.updateArticle);
router.put("/doc/:id", auth, multerArticleDoc,articleCtrl.addDoc); 
router.put("/doc/delete/:id", auth, multerArticleDoc,articleCtrl.deleteDoc); 
router.put("/lien/:id", auth, articleCtrl.addLink); 
router.delete('/:id', auth, multerImage, articleCtrl.deleteArticle)

module.exports = router;