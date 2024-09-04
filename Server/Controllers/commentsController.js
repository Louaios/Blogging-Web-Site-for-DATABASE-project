const {db} = require('./articlesController');


//const commentController = {
const  addComment = async (req, res) => {
      const { comment_by, article_comment, comment_content} = req.body;
  
      db.query(
        'INSERT INTO comments (comment_by, article_comment, comment_content) VALUES (?, ?, ?)',
        [comment_by, article_comment, comment_content],
        (err, results) => {
          if (err) {
            console.error('Error adding comment:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(201).json({ message: 'Comment added successfully' });
          }
        }
      );
    };

const getCommentsByArticle = (req, res) => {
      const articleId = req.params.articleId;
  
      db.query(
        'SELECT comments.comment_id , comments.comment_by ,(SELECT users.username FROM users WHERE users.id_user = comment_by) AS commentateur, comments.article_comment ,comments.comment_content ,  id_article,title, content, create_date, publisher,(SELECT username FROM users WHERE id_user = id_article) AS username, (SELECT Count(*) FROM likes WHERE article_liked = id_article) AS likesCount, (SELECT Count(*) FROM comments WHERE articles.id_article = article_comment) AS commetsCount  FROM comments , articles WHERE article_comment = ? AND article_comment = articles.id_article',
        [articleId],
        (err, results) => {
          if (err) {
            console.error('Error fetching comments:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.json(results);
          }
        }
      );
    };
   const deleteComment = (req, res) => {
      const comment_id = req.params.comment_id;
     db.query('DELETE FROM comments WHERE comment_id = ?', [comment_id], (error) => {
     if (error) res.status(500).json({ error: 'Internal Server Error' });
     else {res.json({ message: 'Comment deleted successfully', id: comment_id })};
     }
    ); 
   }


module.exports = {
  addComment,
  getCommentsByArticle,
  deleteComment,
};