const express = require ('express');
const router = express.Router();
const articleCtrl = require('../controllers/article')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.post("", auth, multer, articleCtrl.createArticle);
router.get("", articleCtrl.getAllArticles);
router.put("/:id", auth, multer, articleCtrl.updateArticle);

module.exports = router;