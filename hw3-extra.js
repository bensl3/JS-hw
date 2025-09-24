/*
Display a question asking for the product of two random integers.
Get user's input and display if correct or not.
If correct, ask whether to ask a new question or end.
If incorrect, allow user to input again until correct.
*/
const questionForm = document.getElementById('questionform');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const jsOutput = document.getElementById('javascript_output');

document.addEventListener('DOMContentLoaded', showNewQuestion);
questionForm.elements['submit'].addEventListener('click', processInput);
questionForm.elements['reset'].addEventListener('click', clearResults);
questionForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent reload if press Enter in input text field
    processInput();
});

jsOutput.style.whiteSpace = 'pre-wrap';  // preserve whitespace and wrap text

const min = 0;
const max = 9;
let int1, int2;

function getRandomInt(min, max) {
    // Ensure min and max are whole numbers in the range
    min = Math.ceil(min);
    max = Math.floor(max);
    // Random integer between min and max inclusive
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function showNewQuestion() {
    clearResults();
    int1 = getRandomInt(min, max);
    int2 = getRandomInt(min, max);
    questionElement.textContent = 'How much is ' + int1 + ' times ' + int2 + '?';
}

function endGame() {
    jsOutput.textContent = 'Thanks for playing, see you next time.';
    questionForm.textContent = 'Reload to start new game.';
}

function processInput() {
    const inputInt = parseInt(answerElement.value, 10);

    if (!Number.isInteger(inputInt)) {
        jsOutput.textContent = 'Input error. Answer must be an integer with no whitespace.';
        answerElement.select();
    } else if (inputInt !== parseFloat(answerElement.value)) {
        jsOutput.textContent = 'Input error. Answer cannot be a decimal.';
        answerElement.select();
    } else {  // input is valid integer
        if (inputInt === int1 * int2) {
            jsOutput.textContent = 'Very good!\nKeep playing? ';

            const yesButton = document.createElement('button');
            yesButton.textContent = 'YES';
            yesButton.ariaLabel = 'Go again';
            yesButton.addEventListener('click', showNewQuestion);

            const noButton = document.createElement('button');
            noButton.textContent = 'NO';
            noButton.ariaLabel = 'End game';
            noButton.addEventListener('click', endGame);

            jsOutput.append(yesButton);
            jsOutput.append(noButton);
            yesButton.focus();
        } else {
            jsOutput.textContent = 'No. Please try again.';
            answerElement.select();
        }
    }
}

function clearResults() {
    jsOutput.textContent = '';
    answerElement.value = '';
    answerElement.focus();
}