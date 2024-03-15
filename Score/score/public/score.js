const url = 'http://localhost:4000/getscore';
const options = {
    method: 'GET', // Méthode de la requête
};

function getScore(){
    fetch(url, options)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
          console.error('Erreur lors du ping:', response.status);
        }
    })
    .then(data => {
        console.log('Score:', data.score);
    })
    .catch(error => {
        console.error('Erreur lors du ping:', error);
    });
}