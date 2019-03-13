const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'smartbrain'
    }
  });


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.json(db.users);
})
app.post('/signin', (req,res) => {
    db.select('email','hash').from('login')
        .where('email','=',req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email','=',req.body.email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json("Unable to get user"))
            } else {
                res.status(400).json('Wrong credentials')
            }
        }).catch(err => res.status(400).json("Wrong credentials"));
})
app.post('/register', (req, res) => {
    const { email, name, password} = req.body;
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        }).into('login').returning('email')
            .then(loginEmail =>{
                return trx('users').returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    }).then(user => res.json(user[0]))
            }).then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => res.status(400).json('Unable to register'));
})
app.get('/profile/:id', (req, res) =>{
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('No such user')
            }
        })
        .catch(err => res.status(400).json('Error getting user'))
})
app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json("Unable to get entries"));
})
app.listen(3000, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('App is listening on Port 3000');
    }
});
