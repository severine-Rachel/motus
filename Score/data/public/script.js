// Find from API /word the word to find
window.onload = function findNumber(){
    fetch('/word')
    .then(response => response.text())
    .then(data => {
        num = data.slice(0, -1).length;
        word = data.slice(0, -1);
        tabword = word.split("");
        tabchange = word.split("");
    })
}

// Listen to the user input
var numTry = 0
var success = 0
const form = document.getElementById('motForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // While number of try is less than 5 we continue
    if (numTry != 5){
        incrNum = numTry + 1}
    // Else call the function addElement to add a div with the result of the game
    else{addElement("L")}
    // For each letter of the word we compare the user input with the letter of tabword
    var letterUser = ""
    for (i = 0; i<num; i++){
        letterUser = document.getElementById('case'+i+numTry).value;
        var trueLetter = tabword.at(i)
        //console.log(letterUser + ' case'+i+numTry + "réel letter : " + trueLetter)
        //console.log("tabword   =  " + tabword)
        // if the letter is the same we change the color of the input and we add the letter in the placeholder
        if (trueLetter == letterUser){
            document.getElementById('case' + i + numTry).style.backgroundColor = '#93ff8a';
            success += 1;
            var input = document.getElementById("case" + i + incrNum);
            input.placeholder = trueLetter;
        }
        // if the letter is not the same, we find if the letter still exist in tab change
        else{
            //console.log("pas la même valeur")
            for (k = 0; k<tabchange.length; k++){
                if (letterUser == tabchange[k]){
                    tabchange.splice(k, 1);
                    document.getElementById('case' + i + numTry).style.backgroundColor = '#ffd48a';
                    break;
                }
            }
        }
    // if every letter was correct then the user guessed the word
    }
    if (success == num){
        addElement("V");
    }
    //else restart for another line
    else{
        success = 0;
    }
    
    numTry += 1
    console.log("fin de form" + numTry)
});
// at the end of the game, add a div with the result
function addElement(a) {
    var newDiv = document.createElement("div");
    if (a == "V"){
        var newContent = document.createTextNode("Vous avez réussi à découvrir le mot ! Bravo !");
        setScore();
    }
    else{
        var newContent = document.createTextNode("You loose ! Le mot était : " + word);
    }
    newDiv.appendChild(newContent);
    var currentDiv = document.getElementById("bravo");
    document.body.insertBefore(newDiv, currentDiv);
  }

// when user start the game, add the input fields
var word = ""
var num = 0
function addFields(){
    var number = num;
    var container = document.getElementById("container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    // j represent the number of try
    for (j=0; j<6; j++){
        for (i=0;i<number;i++){
            var k = i+1
            var input = document.createElement("input");
            input.type = "text";
            input.id = "case" + i + j;
            input.name = "case" + i +j;
            input.maxLength = "1";
            input.size="1";
            input.class="auto-tab";
            input.onkeyup = (function(i, j) {
                return function() {
                    autoTab(i, j, number);
                };
            })(i, j);
            if (input.id == "case00"){
                input.placeholder = tabword[0]
            }
            container.appendChild(input);
        }
        container.appendChild(document.createElement("br"));
    }
    var input = document.getElementById("case" + i + j+1)

    var submit = document.createElement("button");
    submit.type = "submit";
    submit.value = "Check";
    submit.textContent = "Soumettre";
    container.appendChild(submit);
}
function autoTab(i,j, number) {
    k = i
    q = j
    remplissage = document.getElementById("case"+k+q).value
    //si input remplit on ecrit dans la case d'apres
    //si on supprime la valeur on focus sur la case d'avant
    //pas oublier de verifier le cas de fin de ligne
    if(remplissage == ""){
        if(i == 0){
            k = 0
            q += 0
        }
        else k-=1
        document.getElementById("case"+k+q).focus();
    }
    else{
        if(i == number-1){
            //k = 0
            //q += 1
        }
        else k+=1
        document.getElementById("case"+k+q).focus();
    }

    if(document.getElementById("case"+k+q).value == ""){
        console.log("vide")
    }
    else{
        console.log("remplit")
    }
}
var score = 3
const url = `http://localhost:4000/setscore?score=${score}`;
/*
const data = {
    score: 3
};

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // Indique que le corps de la requête est en JSON
    },
    body: JSON.stringify(data) // Convertit les données en JSON
};
*/

    // Options de la requête
    const options = {
        method: 'GET'
    };

function setScore(){
    fetch(url, options)  
    .then(response => {
        if (response.ok) {
            console.log('Score mis à jour');
        } else {
          console.error('Erreur lors du ping:', response.status);
        }
      })
      .then(data => {
        console.log(data);
    })
      .catch(error => {
        console.error('Erreur lors du ping:', error);
      });
      
    }

