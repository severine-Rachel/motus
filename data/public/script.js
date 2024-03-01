function checkWord(userword, word) {
    data = userword === word ? 'Valid word' : 'Invalid word';
    console.log(userword.length)
    if (userword.length != word.length){
        document.getElementById('yourword').textContent = "nombre de lettre différentes"
    }
    else{
        if (userword.toLowerCase() === word.toLowerCase()){
            document.getElementById('yourword').textContent = "correct vous avez mis le mot : " + userword + " mais le mot était : "+ word
        }
        else{
            document.getElementById('yourword').textContent = "incorrect vous avez mis le mot : " + userword + " mais le mot était : "+ word
        }
    }
}
var num = 0
window.onload = function findNumber(){
    fetch('/word')
        .then(response => response.text())
        .then(data => {
            num = data.slice(0, -1)
            console.log(num.length)
        })
}

const form = document.getElementById('motForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userWord = document.getElementById('mot').value;
    fetch('/word?mot='+userWord)
        .then(response => response.text())
        .then(data => {
            checkWord(userWord, data.slice(0, -1));
        })
    //    .catch(error => {
    //        console.error('Error:', error);
    //        document.getElementById('result').textContent = "erreur";
    //    });
});


function addFields(){
    // Generate a dynamic number of inputs
    var number = num.length;
    // Get the element where the inputs will be added to
    var container = document.getElementById("container");
    // Remove every children it had before
    //while (container.hasChildNodes()) {
    //    container.removeChild(container.lastChild);}
    for (i=0;i<number;i++){
        var input = document.createElement("input");
        input.type = "text";
        input.name = "member" + i;
        input.maxLength = "1"
        container.appendChild(input);
        // Append a line break 
    }
}

