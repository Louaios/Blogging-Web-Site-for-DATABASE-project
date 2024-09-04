const {db} = require('./articlesController');

const addReport = (req, res) => {
    const articleId = req.body.articleId;
    const id_user = req.params.id_user;

    db.query(
        'INSERT INTO reports (reported_by, reported_article) VALUES (?, ?)', 
        [id_user, articleId],
        (error, results) => {
            if(error) res.status(401).json({error: 'Error Reporting Article'});
            else {
                res.status(401).json({message: 'Article Reported Successfuly !'});
            }
        }
    )
}

const getReports = (req ,res) =>{
    db.query(
        'SELECT id_article, reported_by , reported_article , title, content, create_date, publisher,(SELECT Count(*) FROM likes WHERE article_liked = id_article) AS likesCount, (SELECT Count(*) FROM comments WHERE articles.id_article = article_comment) AS commetsCount FROM articles , reports WHERE id_article = reported_article ',
        (error , results) => {
            if(error) res.status(401).json({error : 'Something went wrong when fetching reported articles'})
            else{
                res.status(200).json(results);
    }
        }
    )
}

module.exports = {
    addReport,
    getReports,
}