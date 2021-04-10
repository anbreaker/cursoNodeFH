const express = require('express');
const app = express();

const port = 3000;

//Routes Inicio
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/hola-mundo', (req, res) => {
  res.send('Hola Mundo en ruta');
});

app.get('*', (req, res) => {
  res.send('404 | Page Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
