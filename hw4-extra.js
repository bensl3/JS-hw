/*
Output a square using asterisks with side length obtained from a form.
*/
const inputForm = document.getElementById('sidelengthform');
const sideLengthInputId = 'sidelength';
const jsOutput = document.getElementById('javascript_output');
const minLength = 2;
const maxLength = 10;

jsOutput.style.whiteSpace = 'pre';  // preserve whitespace and nowrap

inputForm.elements['submit'].addEventListener('click', processInput);
inputForm.elements['reset'].addEventListener('click', clearResults);
inputForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent reload if press Enter in input text field
    processInput();
});

function processInput() {
    clearResults();
    const sideLength = getIntFromInputElement(sideLengthInputId, minLength, maxLength);
    
    if (sideLength !== null) {
        jsOutput.style.fontFamily = 'monospace';  // make all characters same width

        let outSquare = '';
        for (let i = 1; i <= sideLength; i += 1) {  // iterate each row
            if (i === 1 || i === sideLength) {  // first or last row
                outSquare += repeatString('* ', sideLength);
            } else {  // middle rows
                outSquare += '* ' + repeatString('  ', sideLength - 2) + '* ';
            }
            
            outSquare += '\n';
        }
        jsOutput.textContent = outSquare;
    }
}

function getIntFromInputElement(inputId, min, max) {
    // If valid input, return parsed int, else output error message and return null.
    // Input is invalid if not an integer or < min (if defined) or > max (if defined).
    const input = document.getElementById(inputId);
    const parsedInt = parseInt(input.value, 10)
    const label = input.labels[0].textContent;
    let valid = false;
    let errorText = '';
    if (!Number.isInteger(parsedInt)) {
        errorText += label + ' error. Require integer with no whitespace.\n';
    } else if (parsedInt < min || parsedInt > max) {
        errorText += label + ' out of range. Must be';
        if (typeof(min) !== 'undefined') {
            errorText += ' greater than or equal to ' + min;
            if (typeof(max) !== 'undefined') {
                errorText += ' and';
            }
        }
        if (typeof(max) !== 'undefined') {
            errorText += ' less than or equal to ' + max;
        }
        errorText += '.\n';
    } else {
        valid = true;
    }

    if (valid) {
        return parsedInt;
    } else {
        jsOutput.textContent += errorText;
        input.select();
        return null;
    }
}

function repeatString(string, repeatTimes) {
    let repeatedString = string;
    for (let i = 1; i < repeatTimes; i += 1) {
        repeatedString += string;
    }
    return repeatedString;
}

function clearResults() {
    jsOutput.textContent = '';
    jsOutput.style.removeProperty('font-family')
}
