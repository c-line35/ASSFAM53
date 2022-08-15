const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const mongoose = require ('mongoose');

mongoose.connect(process.env.URL_MONGOOSE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); 

const userRoutes = require('./routes/user')
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

app.use('/api/auth', userRoutes)

module.exports = app;