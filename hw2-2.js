/*
Get 3 integers from an HTML form, then calculate sum, average, product, min,
and max, and output the results. If form's reset button is clicked, clear
all output.
*/
const integerForm = document.getElementById('integersform');

integerForm.elements['submit'].addEventListener('click', processInput);
integerForm.elements['reset'].addEventListener('click', clearResults);

const jsOutput = document.getElementById('javascript_output');

function processInput() {
    const int1 = parseInt(integerForm.elements['integer1'].value);
    const int2 = parseInt(integerForm.elements['integer2'].value);
    const int3 = parseInt(integerForm.elements['integer3'].value);

    jsOutput.style.whiteSpace = 'pre-line';  // preserve line breaks but not extra spaces in output
    jsOutput.style.textWrap = 'nowrap';  // don't wrap (might not work on older browsers)

    // Compute and prepend results to output.
    if (Number.isInteger(int1) && Number.isInteger(int2) && Number.isInteger(int3)) {
        const sum = int1 + int2 + int3;
        const average = sum / 3;
        const product = int1 * int2 * int3;
        const min = Math.min(int1, int2, int3);
        const max = Math.max(int1, int2, int3);
        
        jsOutput.prepend('First integer: ' + int1 + ', Second integer: ' + int2 + ', Third integer: ' + int3
            + '\nSum: ' + sum + '\nAverage: ' + average + '\nProduct: ' + product
            + '\nMin: ' + min + '\nMax: ' + max + '\n\n');
    } else {
        jsOutput.prepend('Input error. Make sure all values are numbers with no whitespace.\n\n');
        console.log('First integer: ' + int1 + ', Second integer: ' + int2 + ', Third integer: ' + int3);
    }
}

function clearResults() {
    jsOutput.textContent = '';
}