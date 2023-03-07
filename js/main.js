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
    }, 1000);
}