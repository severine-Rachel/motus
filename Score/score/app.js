const express = require('express');
const app = express();
app.use(express.static('/public'));
const cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors({
  origin: 'http://localhost:3002',
}));
// si l'on va sur /, on renvoie le fichier score.html

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/setscore', (req, res) => {
  const score = parseInt(req.query.score);
  console.log(score)
  res.json({ score: score });
});

app.get('/getscore', (req, res) => {
  score2 = req.body.score;
  res.json({ score: score });
});

const port = 4000;
app.listen(port, () => {
});