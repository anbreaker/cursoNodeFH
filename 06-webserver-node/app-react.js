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
app.use(express.static('public/build-react-example'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/build-react-example/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
