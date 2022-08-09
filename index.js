const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const mongoose= require('mongoose');
const users=require('./routes/users');
const movies=require('./routes/movies');
const casts= require('./routes/casts');
const collections = require('./routes/collections');
const operation=  require('./routes/operation');
const app = express();
const Fawn  = require('fawn');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movie_rating_system')
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.log('Error',err.message[0]));

app.use('/api/movies',movies);
app.use('/api/genres', genres);
app.use('/api/users', users);
app.use('/api/casts', casts);
app.use('/api/collections', collections);
app.use('/api', operation);




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));