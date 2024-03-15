const express = require('express');
const app = express();
app.use(express.static('/public'));
const cors = require('cors');
app.use(express.json());
var bodyParser = require('body-parser')
// Activer CORS avec des options spécifiques pour votre application web
app.use(cors({
  origin: 'http://localhost:3002', // Remplacez par l'URL de votre application web
}));
// si l'on va sur /, on renvoie le fichier score.html

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})
/*
app.get('/setscore', (req, res) => {
  const score = parseInt(req.query.score);
  console.log(score)
  res.send(`${score}`);
});

app.post('/setscore', (req, res) => {
  const score = parseInt(req.query.score);
  console.log(score)
  res.send(`${score}`);
});
*/
app.get('/getscore', (req, res) => {
  score2 = req.body.score;
  res.send('score');
});
const port = 4000;
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

app.get('/setscore',  async (req, res) => {
  //On récupère le nom du joueur actuel dans l'url
  let body = req.body;
  let score = body.score;
  console.log(score);
  //Si l'utilisateur n'est pas connecté, on ne renvoie rien
  if(score==undefined || score=="undefined"){
    res.send("No score");
    return;
  }
  res.send(score);
})