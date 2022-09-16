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
router.post('/pass', userCtrl.resetPassword);
router.put('/user/:token', validePassword, userCtrl.initPassword)
router.put('/user/update/:id', auth, userCtrl.updateUser);
router.get('/iduser/:id', auth, userCtrl.getUserById);
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router;