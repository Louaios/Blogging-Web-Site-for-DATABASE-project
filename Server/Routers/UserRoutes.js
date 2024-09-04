const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

router.post('/register', UserController.Register);
router.delete('/delete/:id_user', UserController.deleteUser);
router.post('/login', UserController.Login);
router.put('/updatebio/:id_user', UserController.updateBio);
router.get('/usersearch/:search',UserController.getUserBySearch);
router.get('/users',UserController.getAllusers);
router.get('/user/:id',UserController.getUserByid);
router.get('/username/:username' , UserController.getUserByUsername);


module.exports = router;