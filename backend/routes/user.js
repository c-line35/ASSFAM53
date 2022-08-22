const express = require ('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const valideEmail = require('../middleware/valideEmail');
const validePassword = require('../middleware/validePassword');

router.post('/signup', valideEmail, validePassword , userCtrl.signup);
router.post('/login', valideEmail, userCtrl.login);
router.get('/user/:token', userCtrl.getDataUser);
router.get('/users', userCtrl.getAllUsers);
router.post('/pass', userCtrl.resetPassword);
router.put('/user/:token', userCtrl.initPassword)

module.exports = router;