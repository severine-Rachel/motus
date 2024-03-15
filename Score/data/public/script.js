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

var numTry = 0
var success = 0
const form = document.getElementById('motForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (numTry != 5){
        incrNum = numTry + 1}
    else{addElement("L")}
    var letterUser = ""
    for (i = 0; i<num; i++){
        letterUser = document.getElementById('case'+i+numTry).value;
        var trueLetter = tabword.at(i)
        if (trueLetter == letterUser){
            document.getElementById('case' + i + numTry).style.backgroundColor = '#93ff8a';
            success += 1;
            var input = document.getElementById("case" + i + incrNum);
            input.placeholder = trueLetter;
        }
        else{
            for (k = 0; k<tabchange.length; k++){
                if (letterUser == tabchange[k]){
                    tabchange.splice(k, 1);
                    document.getElementById('case' + i + numTry).style.backgroundColor = '#ffd48a';
                    break;
                }
            }
        }
    }
    if (success == num){
        addElement("V");
    }
    else{
        success = 0;
    }
    
    numTry += 1
    console.log("fin de form" + numTry)
});
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

var word = ""
var num = 0
function addFields(){
    var number = num;
    var container = document.getElementById("container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
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
    if(remplissage == ""){
        if(i == 0){
            k = 0
            q += 0
        }
        else k-=1
        document.getElementById("case"+k+q).focus();
    }
    else{
        if(i == number-1){}
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

const url = 'http://localhost:4000/setscore?score=${score}';

const options = {
    method: 'GET',
};

function setScore() {
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