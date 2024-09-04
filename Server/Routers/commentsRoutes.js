const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentsController');

router.post('/add-comment', commentController.addComment);
router.get('/comments/:articleId', commentController.getCommentsByArticle);
router.delete('/comments/delete/:comment_id', commentController.deleteComment);

module.exports = router;