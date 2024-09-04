const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {db} = require('./articlesController');

const Register = async (req, res) => {
  const { username, password, email, gendre} = req.body;

  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
          'INSERT INTO users (username, password, email, gendre,role, joinDate) VALUES (?, ?, ?, ?, 2 , CURRENT_DATE)',
          [username, hashedPassword, email, gendre],
          (err, results) => {
              if (err) {
                  console.error('Error registering user:', err);
                  res.status(500).json({ error: 'Internal Server Error' });
              } else {
                  res.status(201).json({ message: 'User registered successfully' });
              }
          }
      );
  } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

  const Login = async (req, res) => {
    const { username, password } = req.body;
  
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (results.length > 0) {
          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
  
          if (passwordMatch) {
            const token = jwt.sign({ userId: user.id_user ,role : user.role ,  username : username , password : password , email : user.email , gender : user.gendre , joindate : user.joinDate , bio : user.bio }, 'your_secret_key', { expiresIn: '1h' });
  
            res.status(200).json({ token });
          } else {
            res.status(401).json({ error: 'Invalid username or password' });
          }
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    });
  };


  const getUserByUsername = (req, res) => {
    const username = req.params.username;
    db.query('SELECT id_user , username , email , gendre , joinDate , bio FROM users WHERE username = ?', [username], (error, results) => {
      if (error) res.status(401).json({error : "Error fetching user"});
      res.json(results[0]);
    });
  };

  const getUserByid = (req, res) => {
    const id = req.params.id;
    db.query('SELECT username , password, bio , email FROM users WHERE id_user = ?', [id], (error, results) => {
      if (error) res.status(401).json({error : "Error fetching user"});
      res.json(results[0]);
    });
  };
  const getUserBySearch = (req, res) => {
    const username = req.params.search;
    db.query('SELECT id_user , username , email , gendre , joinDate , bio FROM users WHERE username like ?', [`%${username}%`], (error, results) => {
      if (error) res.status(401).json({error : "Error fetching user"});
      res.json(results);
    });
  };

  const getAllusers = (req, res) => {
    db.query('SELECT id_user , username , email , gendre , joinDate , bio FROM users', (error, results) => {
      if (error) res.status(401).json({error : "Error fetching user"});
      else {res.json(results)};
    });
  };

  
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  };
  const updateBio = (req, res) => {
    const id_user = req.params.id_user;
    const {Bio , username ,email} = req.body;

    db.query(
      'UPDATE users SET Bio = ? , username = ? , email = ? WHERE id_user = ?', 
      [Bio,username , email ,id_user],
       (error, results) => {
         if(error) res.status(401).json({error: 'Error When Updating User Bio'});
         else {
          res.status(201).json({message: 'User Bio Updated Successfully'});
         }
       }
    )
  };

  const deleteUser = (req, res) => {
    const id_user = req.params.id_user;

    db.query(
      'DELETE FROM users where id_user = ?',
      [id_user],
      (error, results) => {
        if(error) res.status(401).json({error: 'Internal Error while Deleting User'});
        else {
          res.status(201).json({message: 'User Deleted Succesfully'});
        }
      }
    )
  }

  module.exports = {
    Register,
    Login,
    getUserByUsername,
    getUserByid,
    getUserBySearch,
    getAllusers,
    verifyToken,
    updateBio,
    deleteUser,
    db
  }