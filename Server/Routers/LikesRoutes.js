const express = require('express');
const router = express.Router();
const LikesController = require('../Controllers/LikesController');


router.post('/add-like', LikesController.addLike);
router.get('/likes/liked/:id_user', LikesController.GetLikedArticlesByUser);
router.get('/likes/:articleId', LikesController.GetLikedUsersByArticle);
router.get('/veriflike/:id_article/:user_id', LikesController.verifyLike);
router.delete('/delete-like', LikesController.deleteLike);


module.exports = router;