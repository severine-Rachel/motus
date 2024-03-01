const express = require('express');
const app = express();
app.use(express.static('../data/public'));

const port1 = 3000;
const port2 = 4000;
//const oldApp = require('../data/app');

// Utiliser le middleware pour les fichiers statiques
//app.use(oldApp);
app.get('/port', (req, res) => {
    res.send('MOTUS APP working on Rachel-Ubuntu port 3000');
});

app.listen(port1, () => {
    console.log(`Motus app listening on port ${port1}`);
});