const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware
// Express Handlebars engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Servir contenido Estatico
app.use(express.static('public'));

//Routes Inicio
app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'anbreaker',
    titulo: 'Curso Node FH',
  });
});

app.get('/generic', (req, res) => {
  res.render('generic', {
    nombre: 'anbreaker',
    titulo: 'Curso Node FH',
  });
});

app.get('/elements', (req, res) => {
  res.render('elements', {
    nombre: 'anbreaker',
    titulo: 'Curso Node FH',
  });
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
