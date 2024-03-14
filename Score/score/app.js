const express = require('express');
const app = express();
app.use(express.static('../data/public'));

const cors = require('cors');
// Activer CORS avec des options spécifiques pour votre application web
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre application web
}));

app.get('/', (req, res) => {
    // Redirect to score.html
    res.redirect('/score');
});

app.get('/setscore', (req, res) => {
  res.send("le score a été mis à jour");
});

app.get('/getscore', (req, res) => {
  score = req.body.score;
  res.send('score');
});

const port = 4000;
app.listen(port, () => {
});