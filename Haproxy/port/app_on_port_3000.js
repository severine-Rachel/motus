const express = require('express');
const fs = require('fs');
const os = require('os');
const app = express();

app.use(express.static('../data/public'));

let wordList;
try {
  wordList = fs.readFileSync('../data/liste_francais_utf8.txt', 'utf8').split('\n').filter(Boolean);
} catch (err) {
  console.error('Error reading file:', err);
  process.exit(1);
}
function generateRandomNumber(seed) {
  const seedrandom = require('seedrandom');
  var date = new Date().toISOString().slice(0, 10); 
  const tabDate = date.split("-")
  var dateAdd = parseInt(tabDate[0]) + parseInt(tabDate[1]) + parseInt(tabDate[2])
  var combinedSeed = dateAdd + seed;
  const randomNumber = parseInt(seedrandom(combinedSeed)()*2700);
  return randomNumber;
}

const nombreElements = wordList.lenght

const randomNum = generateRandomNumber(50);
const word = wordList[randomNum]

//app.get('/word', (req, res) => {
//  const word = wordList[randomNum]
//  res.send(word);
//});
//const userWord = require('./public/index').userWord

app.get('/word', (req, res) => {
  const word = wordList[randomNum]
  res.send(word);
});

const port = process.env.PORT || 3000 

app.listen(port, () => {
  console.log(`Server is listening on ${os.hostname()} on port ${port}`);
});
/*app.listen(port2, () => {
  console.log(`Server is listening on port ${port2}`);
});*/
