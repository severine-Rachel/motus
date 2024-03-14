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
// Find from API /word the word to find
window.onload = function findNumber(){
    fetch('/word')
        .then(response => response.text())
        .then(data => {
            num = data.slice(0, -1).length // save the number of letter in the word
            word = data.slice(0, -1) // save the word
            tabword = word.split("") // save the word in a table
            tabchange =  word.split("") // save the word in another table
            console.log(num)
            console.log(word)
            console.log(tabword)
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
        incrNum = numTry+1
    }
    // Else call the function addElement to add a div with the result of the game
    else{addElement("L")}

    // For each letter of the word we compare the user input with the letter of tabword
    var letterUser = ""
    for (i = 0; i<num; i++){
        letterUser = document.getElementById('case'+i+numTry).value;
        var trueLetter = tabword.at(i)
        console.log(letterUser + ' case'+i+numTry + "réel letter : " + trueLetter)
        console.log("tabword   =  " + tabword)
        // if the letter is the same we change the color of the input and we add the letter in the placeholder
        if (trueLetter == letterUser){
            document.getElementById('case'+i+numTry).style.backgroundColor = '#93ff8a';
            success +=1
            var input = document.getElementById("case" + i + incrNum);
            input.placeholder = trueLetter
        }
        // if the letter is not the same, we find if the letter still exist in tab change
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
    // if every letter was correct then the user guessed the word
    }
    if (success == num){
        addElement("V")
    }
    //else restart for another line
    else{
        success = 0
    }
    
    numTry += 1
    console.log("fin de form" + numTry)
});

// at the end of the game, add a div with the result
function addElement(a) {
    // crée un nouvel élément div
    var newDiv = document.createElement("div");
    // et lui donne un peu de contenu
    if (a == "V"){
        var newContent = document.createTextNode("Bravo t'as trouvé le mot ! Tu veux un cookie ?");
    }
    else{
        var newContent = document.createTextNode("You loose ! Le mot était : " + word);
    }
    
    // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);
  
    // ajoute le nouvel élément créé et son contenu dans le DOM
    var currentDiv = document.getElementById("bravo");
    document.body.insertBefore(newDiv, currentDiv);
  }

// when user start the game, add the input fields
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
            input.oninput="autoTab('case'"+ i, j + ", '1', 'case'"+k, j+")"

            // show the first letter of the word
            if (input.id == "case00"){
                input.placeholder = tabword[0]
            }
            container.appendChild(input);
            // Append a line break 
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
function autoTab(field1, len, field2) {
    console.log("coucou")
	if (document.getElementById(field1).value.length == len) {
		document.getElementById(field2).focus();
		}
}

/*
addEventListener("keyup", (event) => {

    form.addEventListener(".inputs", (event) => {
        console.log("coucou")
        var dom = document.getElementById("case" + i + j);
        var ml = dom.maxLength;
        var lg = dom.value.length;
        if (lg >= ml) {
            document.getElementById("case"+(i+1)+j).focus()
        }
    })
    
})
function onchechnge(i,j){
    console.log("coucou")
    var dom = document.getElementById("case" + i + j);
    var ml = dom.maxLength;
    var lg = dom.value.length;
    if (lg >= ml) {
        document.getElementById("case"+(i+1)+j).focus()
    }
}
*/
/*
const inputs = document.getElementsByClassName('auto-tab');
form.addEventListener(".inputs", (event) => {
    event.preventDefault();
    console.log("coucou")
    if (this.value.length == this.maxLength) {
          $(this).next('.inputs').focus();
        }
    
});

inputs.forEach((input, index) => {
    console.log(input)
    console.log(index)
    
    input.addEventListener('input', (event) => {
        if (input.value.length = 1) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });
});*/
