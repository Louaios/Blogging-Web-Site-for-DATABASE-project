const {db} = require('./articlesController');

const addLike = async (req, res) => {
    const {liked_by, article_liked} = req.body;

    db.query(
        'INSERT INTO likes (liked_by, article_liked) VALUES ( ?, ?)',
        [liked_by, article_liked],
        (err, results) => {
            if (err) {
                console.error('Error adding comment:', err);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                res.status(201).json({ message: 'Article Liked successfully' });
              }
        }
    )
};
const deleteLike = (req, res) => {
  const {liked_by, article_liked} = req.body;
    db.query(
        'DELETE FROM likes where liked_by = ? AND article_liked = ?',
        [liked_by, article_liked],
        (err, results) => {
            if (err) {
                console.error('Error adding comment:', err);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                res.status(201).json({ message: 'Article Liked successfully' });
              }
            }
     );
};

const GetLikedArticlesByUser = (req, res) => {
  const id_user = req.params.id_user;
  db.query(
    'SELECT id_article, users.username ,  title , content, create_date, publisher , (SELECT COUNT(*) FROM likes WHERE likes.article_liked = id_article) AS likes , (SELECT COUNT(*) FROM comments WHERE comments.article_comment = id_article) AS commets FROM `articles`, likes, users WHERE likes.article_liked = articles.id_article and users.id_user = liked_by AND users.id_user = ?',
    [id_user],
    (error, results) => {
      if(error) res.status(401).json({error: "ERROR WHILE FETCHING FOR LIKED ARTICLES"})
      else {
       res.status(201).json(results);
      }
    }
  )
}
const verifyLike = (req, res) => {
  const id_article = req.params.id_article;
  const user_id = req.params.user_id;
  db.query(
    'SELECT * FROM likes WHERE liked_by = ? AND ? = article_liked',
    [user_id,id_article],
    (error, results) => {
      if(error) res.status(401).json({error: "Error WHILE FETCHING"})
      else {
          res.status(201).json(results);
     }
    }
  )
}

const GetLikedUsersByArticle = (req, res) => {
  const articleId = req.params.articleId;
  db.query(
    'SELECT id_user ,username, password, email, gendre, joinDate, Bio FROM `users`, likes, articles WHERE articles.id_article = likes.article_liked AND users.id_user = liked_by and articles.id_article = ?',
     [articleId],
     (error, results) => {
      if(error) res.status(401).json({error: "Error WHILE FETCHING FOR USERS"})
      else {
          res.status(201).json(results);
     }
    }
  )
}

module.exports = {
  addLike,
  deleteLike,
  GetLikedArticlesByUser,
  GetLikedUsersByArticle,
  verifyLike,
}