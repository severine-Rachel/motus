/*
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
*/
function checkWord(){

}
window.onload = function findNumber(){
    fetch('/word')
        .then(response => response.text())
        .then(data => {
            num = data.slice(0, -1).length
            word = data.slice(0, -1)
            tabword = word.split("")
            tabchange =  word.split("")
            console.log(num)
            console.log(word)
            console.log(tabword)
        })
}

var numTry = 0
var success = 0
const form = document.getElementById('motForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (numTry != 5){
        incrNum = numTry+1
    }
    else{addElement("L")}
    var letterUser = ""
    for (i = 0; i<num; i++){
        letterUser = document.getElementById('case'+i+numTry).value;
        var trueLetter = tabword.at(i)
        console.log(letterUser + ' case'+i+numTry + "réel letter : " + trueLetter)
        console.log("tabword   =  " + tabword)
        if (trueLetter == letterUser){
            document.getElementById('case'+i+numTry).style.backgroundColor = '#93ff8a';
            success +=1
            var input = document.getElementById("case" + i + incrNum);
            input.placeholder = trueLetter
        }
        else{
            console.log("pas la même valeur")
            for (k = 0; k<tabchange.length; k++){
                console.log("letter k = " + tabchange[k])
                if (letterUser == tabchange[k]){
                    tabchange.splice(k, 1)
                    console.log("tabchange   =  " + tabchange)
                    document.getElementById('case'+i+numTry).style.backgroundColor = '#ffd48a';
                    break;
                }
            }
        }
        
    }
    if (success == num){
        addElement("V")
    }
    else{
        success = 0
    }
    
    numTry += 1
    console.log("fin de form" + numTry)
    
   /*
    const userWord = document.getElementById('case').value;
    fetch('/word?mot='+userWord)
        .then(response => response.text())
        .then(data => {
            checkWord(userWord, data.slice(0, -1));
        })*/
    //    .catch(error => {
    //        console.error('Error:', error);
    //        document.getElementById('result').textContent = "erreur";
    //    });
});
function addElement(a) {
    // crée un nouvel élément div
    var newDiv = document.createElement("div");
    // et lui donne un peu de contenu
    if (a == "V"){
        var newContent = document.createTextNode("Bravo t'as trouvé le mot ! Tu veux un cookie ?");
    }
    else{
        var newContent = document.createTextNode("Perdu gros looser !");
    }
    
    // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);
  
    // ajoute le nouvel élément créé et son contenu dans le DOM
    var currentDiv = document.getElementById("bravo");
    document.body.insertBefore(newDiv, currentDiv);
  }
var word = ""
var num = 0
function addFields(){
    var number = num;
    // Get the element where the inputs will be added to
    var container = document.getElementById("container");
    // Remove every children it had before
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (j=0; j<6; j++){
        for (i=0;i<number;i++){
            var input = document.createElement("input");
            input.type = "text";
            input.id = "case" + i + j
            input.name = "case" + i +j;
            input.maxLength = "1"
            container.appendChild(input);
            // Append a line break 
        }
        container.appendChild(document.createElement("br"));
        
    }var input = document.getElementById("case" + i + j+1)
    
}

