const express = require ('express');
const router = express.Router();
const staffCtrl = require('../controllers/staff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.post('', auth, staffCtrl.createStaff);
router.get('/:id', auth, staffCtrl.getStaffById);
router.get('', staffCtrl.getAllStaff);
router.get('/infos/conn', auth, staffCtrl.getAllStaffConn);
router.put('/:id', auth, multer, staffCtrl.updateStaff);
router.delete('/:id', auth, multer, staffCtrl.deleteStaff)
module.exports = router;