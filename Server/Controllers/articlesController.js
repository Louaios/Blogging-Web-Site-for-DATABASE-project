const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'ghani',
  password: 'Grrt9Ai0SshxzPie',
  database: 'myarticles',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

const getAllArticles = (req, res) => {
  db.query(
    'SELECT id_article,title, content, create_date, publisher,(SELECT username FROM users WHERE id_user = id_article) AS username, (SELECT Count(*) FROM likes WHERE article_liked = id_article)AS likesCount, (SELECT Count(*) FROM comments WHERE articles.id_article = article_comment)AS commetsCount FROM articles WHERE 1',
    (err, Results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(Results);
    }
);
};


const getArticleByUserId = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT id_article , title , content, create_date, publisher,(SELECT username FROM users WHERE id_user = publisher) AS username, (SELECT Count(*) FROM likes WHERE article_liked = id_article)AS likesCount, (SELECT Count(*) FROM comments WHERE articles.id_article = article_comment)AS commetsCount FROM articles WHERE publisher = ?', [userId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

const getArticleId = (req, res) => {
  const articleId = req.params.articleId;
  db.query('SELECT id_article , title , content, create_date, publisher,(SELECT username FROM users WHERE id_user = publisher) AS username, (SELECT Count(*) FROM likes WHERE article_liked = id_article)AS likesCount, (SELECT Count(*) FROM comments WHERE articles.id_article = article_comment)AS commetsCount FROM articles WHERE id_article = ?', [articleId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};



const createArticle = (req, res) => {
  const { title, content, publisher} = req.body;
  db.query('INSERT INTO articles (title, content , create_date , publisher) VALUES (?, ? , CURRENT_DATE , ?)', [title, content ,publisher ], (error, result) => {
    if (error) throw error;
    res.json({ id: result.insertId, title, content });
  });
};


const updateArticle = (req, res) => {
  const articleId = req.params.id;
  const { title, content } = req.body;
  db.query('UPDATE articles SET title = ?, content = ? WHERE id_article = ?', [title, content, articleId], (error) => {
    if (error) throw error;
    res.json({ id: articleId, title, content });
  });
};


const deleteArticle = (req, res) => {
  const articleId = req.params.id;
  db.query('DELETE FROM articles WHERE id_article = ?', [articleId], (error) => {
    if (error) throw error;
    res.json({ message: 'Article deleted successfully', id: articleId });
  });
};

module.exports = {
  getAllArticles,
  getArticleByUserId,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleId,
  db
};
