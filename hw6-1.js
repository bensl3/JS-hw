/*
Get input from a form, and validate it is a number with at least 4 decimal places.
Then output results of the following:
A. round the floating-point number to the nearest integer
B. calculate the square root of the floating-point number and round it to an integer
C. round the floating-point number to the nearest tenths position
D. round the floating-point number to the nearest hundredths position
E. round the floating-point number to the nearest thousandths position
*/
const form = document.getElementById('decimalForm');
const jsOutput = document.getElementById('javascript_output');

form.elements['reset'].addEventListener('click', clearResults);
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent reload if press Enter in input field
  processInput();
});

jsOutput.style.whiteSpace = 'pre-wrap';  // preserve whitespace and wrap

function processInput() {
  clearResults();
  const input = form.elements['decimal'].value.trim();
  const decimal4Regex = /^\d*\.\d{4,}$/;
  
  if (decimal4Regex.test(input)) {
    const inputFloat = parseFloat(input);
    const roundInteger = Math.round(inputFloat);
    const squareRoot = Math.round(Math.sqrt(inputFloat));
    const roundTenths = inputFloat.toFixed(1);
    const roundHundredths = inputFloat.toFixed(2);
    const roundThousandths = inputFloat.toFixed(3);
    
    jsOutput.textContent = `Round to integer: ${roundInteger}
Square root and round to integer: ${squareRoot}
Round to tenths: ${roundTenths}
Round to hundredths: ${roundHundredths}
Round to thousandths: ${roundThousandths}
`;
  } else {
    jsOutput.textContent = 'Please enter a number with at least 4 decimal places.';
  }
}

function clearResults() {
  jsOutput.textContent = '';
}