const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => { res.json('It\'s working') });
app.post('/signin', (req,res) => { signin.handleSigninPost(req,res,db,bcrypt) });
app.post('/register', (req, res) => { register.handleRegisterPost(req,res,db,bcrypt) });
app.get('/profile/:id', (req, res) =>{ profile.handleProfileGet(req,res,db) });
app.put('/image', (req, res) => { image.handleImagePut(req,res,db) });
app.post('/imageurl', (req, res) => { image.handleClarifaiCall(req,res) });
app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`App is listening on Port ${process.env.PORT}`);
    }
});
