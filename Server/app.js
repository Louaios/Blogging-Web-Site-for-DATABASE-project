const express = require('express');
const bodyParser = require('body-parser');
const articlesRoutes = require('./Routers/articlesRoutes');
const UserRoutes = require('./Routers/UserRoutes');
const LikesRoutes = require('./Routers/LikesRoutes');
const commentsRoutes = require('./Routers/commentsRoutes');
const reportsRoutes = require('./Routers/reportsRoutes');
const cors = require('cors');
const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config({ path: './dotnev.env'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


  
app.use('/', articlesRoutes);
app.use('/', UserRoutes);
app.use('/', commentsRoutes);
app.use('/', reportsRoutes);
app.use('/', LikesRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

