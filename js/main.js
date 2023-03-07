/*Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, 
il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

//Variabili Container e gameContainer
const gameContainerDom = document.getElementById("game-container");
const containerDom = document.getElementById("container");

//Lunghezza e variabile array;
const arrayLength = 5;
let numbersArray = [];


//Secondi di countdown
let seconds = 3;

//Funzione che genera numeri random
function randomNumberGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//Funzione che genera un array con numeri random
function randomArrayGen(length, min, max) {
    let newArray = [];
    for (let i = 0; i < length; i++) {
        newArray.push(randomNumberGen(min, max));
    }

    return newArray;
}

//Funzione che fa partire un countdown e restituisce true appena è finito
function startCountDown(seconds) {
    let guessedNumbers = [];

    const milliseconds = seconds * 1000;

    setTimeout(function () {
        gameContainerDom.innerHTML = "";
    }, milliseconds);

    let newCountDown = setInterval(function () {
        console.log(seconds);
        seconds--;
        if (seconds == 0) {
            guessedNumbers = askNumbers(numbersArray);
            outcomePrinter(guessedNumbers);
            clearInterval(newCountDown);
        }
    }, 3100);
}
//crea il button Play per giocare
const playButton = document.createElement("button");
playButton.innerHTML = "Play";
playButton.addEventListener("click", start);
gameContainerDom.append(playButton);

//Funzione che fa partire il gioco
function start() {
    containerDom.classList.remove("win");
    numbersArray = randomArrayGen(arrayLength, 1, 100);
    gameContainerDom.innerHTML = numbersArray;
    console.log(numbersArray);
    startCountDown(seconds);
}


//Funzione che chiede in prompt i numeri e controlla se sono presenti in un array, restituisce un array con i numeri indovinati
function askNumbers(array) {
    
    gameContainerDom.innerHTML = "";
    let guessedNumbers = [];

    for (let i = 0; i < array.length; i++) {
        
        let input = parseInt(prompt("Inserisci un numero che ti ricordi di aver visto"));

        if (isInArray(input, array)) {
            guessedNumbers.push(input);
        }
    }
    return guessedNumbers;
}

//Funzione che controlla se un valore è presente in un array
function isInArray(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

//Funzione che stampa un outcome diverso in base a quanti numeri sono stati indovinati
function outcomePrinter(guessedNumbers){
    let outcome = document.createElement("div");
    const nGuessedNumbers = guessedNumbers.length;

    outcome.innerHTML = "Hai indovinato ";
    if (nGuessedNumbers == 1) {
        outcome.innerHTML += "1 numero su " + arrayLength + ": <br> " + guessedNumbers;
    } else if (nGuessedNumbers == arrayLength) {
        outcome.innerHTML += nGuessedNumbers + " numeri su " + arrayLength + ": <br> " + guessedNumbers + " <br> Complimenti!";
        containerDom.classList.add("win");
    } else if (nGuessedNumbers > 0) {
        outcome.innerHTML += nGuessedNumbers + " numeri su " + arrayLength + ": <br> " + guessedNumbers;
    } else {
        outcome.innerHTML = "Non hai indovinato nessun numero!";
    }

    outcome.innerHTML += " <br> Gioca ancora!"
    gameContainerDom.append(outcome);
}