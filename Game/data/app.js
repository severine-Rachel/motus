const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors({
  origin: 'https://localhost:4000'
}));

let wordList;
try {
  wordList = fs.readFileSync('liste_francais_utf8.txt', 'utf8').split('\n').filter(Boolean);
} catch (err) {
  console.error('Error reading file:', err);
  process.exit(1);
}
function generateRandomNumber(seed) {
  const seedrandom = require('seedrandom');
  var date = new Date().toISOString().slice(0, 10); 
  const tabDate = date.split("-");
  var dateAdd = parseInt(tabDate[0]) + parseInt(tabDate[1]) + parseInt(tabDate[2]);
  var combinedSeed = dateAdd + seed;
  const randomNumber = parseInt(seedrandom(combinedSeed)()*2700);
  return randomNumber;
}

const randomNum = generateRandomNumber(50);

app.get('/word', (req, res) => {
  const word = wordList[randomNum]
  res.send(word);
});

const port = 3002;
app.listen(port, () => {
});