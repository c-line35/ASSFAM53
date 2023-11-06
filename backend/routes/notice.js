const express = require ('express');
const router = express.Router();
const noticeCtrl = require('../controllers/notice')
const auth = require('../middleware/auth');

router.post("/:bookId/:userId", auth, noticeCtrl.createNotice);
router.get("/book/:bookId", auth, noticeCtrl.getBookNotices);
router.get("/:id", auth, noticeCtrl.getOneNotice);
router.get("/user/:userId", auth, noticeCtrl.getUserNotice);
router.put("/:id", auth, noticeCtrl.updateNotice);

module.exports = router;