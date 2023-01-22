const express = require ('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const valideEmail = require('../middleware/valideEmail');
const validePassword = require('../middleware/validePassword');
const auth = require('../middleware/auth');

router.post('/signup', valideEmail, validePassword , userCtrl.signup);
router.post('/login', valideEmail, userCtrl.login);
router.get('/user/:token', userCtrl.getDataUser);
router.get('/users', auth, userCtrl.getAllUsers);
router.get('/users/admins', auth, userCtrl.getAllAdmins);
router.post('/pass', userCtrl.resetPassword);
router.put('/user/:token', validePassword, userCtrl.initPassword)
router.put('/user/update/:id', auth, userCtrl.updateUser);
router.put('/user/update/:id/end', auth, userCtrl.updateUserEnd);
router.put ('/user/updateAdminRights/:id', auth, userCtrl.updateAdminRights);
router.put ('/user/updateUserAdmin/:id', auth, userCtrl.updateUserAdmin);
router.put ('/user/deleteUserAdmin/:id', auth, userCtrl.deleteUserAdmin);
router.get('/iduser/:id', auth, userCtrl.getUserById);
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router;