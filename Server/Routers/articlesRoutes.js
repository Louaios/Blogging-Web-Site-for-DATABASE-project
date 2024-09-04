const express = require('express');
const router = express.Router();
const articlesController = require('../Controllers/articlesController');

router.get('/articles', articlesController.getAllArticles);
router.get('/articles/:id', articlesController.getArticleByUserId);
router.get('/article/:articleId', articlesController.getArticleId);
router.post('/articles', articlesController.createArticle);
router.put('/articles/:id', articlesController.updateArticle);
router.delete('/articles/:id', articlesController.deleteArticle);

module.exports = router;