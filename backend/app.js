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

const userRoutes = require('./routes/user');
const staffRoutes = require('./routes/staff');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/staff', staffRoutes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

module.exports = app;