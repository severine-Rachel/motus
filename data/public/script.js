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
        incrNum = numTry + 1
    }
    else {addElement("L")};
    var letterUser = "";

    for (i = 0; i<num; i++){
        letterUser = document.getElementById('case' + i + numTry).value;
        var trueLetter = tabword.at(i);
        if (trueLetter == letterUser){
            document.getElementById('case' + i + numTry).style.backgroundColor = '#93ff8a';
            success += 1;
            var input = document.getElementById("case" + i + incrNum);
            input.placeholder = trueLetter;
        }
        else {
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
    
    numTry += 1;
});

function addElement(a) {
    var newDiv = document.createElement("div");
    if (a == "V"){
        var newContent = document.createTextNode("Vous avez réussi à découvrir le mot ! Bravo !");
    }
    else{
        var newContent = document.createTextNode("Vous n'avez pas réussi à découvrir le mot ! Dommage !");
    }
    
    newDiv.appendChild(newContent);
    var currentDiv = document.getElementById("bravo");
    document.body.insertBefore(newDiv, currentDiv);
  }

var word = "";
var num = 0;
function addFields(){
    var number = num;
    var container = document.getElementById("container");
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
            if (input.id == "case00"){
                input.placeholder = tabword[0]
            }
            container.appendChild(input);
        }
        container.appendChild(document.createElement("br"));
        
    } var input = document.getElementById("case" + i + j + 1);
}