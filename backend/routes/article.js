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

module.exports = router;