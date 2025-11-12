/*
Validate inputs from a form:
  User has entered data in the input text box,
  AND has checked one of the radio buttons,
  AND has checked at least one checkbox,
  AND has selected an option from the list of options in the select element.
Output an error message for each invalid item above.
If all are valid, output a success message.
*/
const form = document.getElementById('inputForm');
const jsOutput = document.getElementById('javascript_output');

jsOutput.style.whiteSpace = 'pre';  // preserve whitespace and nowrap

form.elements['reset'].addEventListener('click', clearResults);
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent reload if press Enter in input field
  processInput();
});

function processInput() {
  const fullName = form.elements['fullName'].value.trim();
  const ageGroup = form.querySelector('input[name="ageGroup"]:checked');
  const browsers = form.querySelectorAll('input[name="browsers"]:checked');
  const movieType = form.elements['movieType'].value;
  
  let errorMessages = [];
  if (fullName === '') {
    errorMessages.push('Full Name is required.');
  }
  if (ageGroup === null) {
    errorMessages.push('Age group is required.');
  }
  if (browsers.length < 1) {
    errorMessages.push('At least one browser must be selected.');
  }
  if (movieType === '') {
    errorMessages.push('Preferred movie type is required.');
  }

  if (errorMessages.length > 0) {
    jsOutput.textContent = 'Error:\n'
    for (let i = 0; i < errorMessages.length; i++) {
      jsOutput.textContent += errorMessages[i] + '\n';
    }
  } else {
    jsOutput.textContent = 'Thanks, your data was submitted!';
  }
}

function clearResults() {
  jsOutput.textContent = '';
}
