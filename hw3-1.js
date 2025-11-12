/*
Get student scores from an HTML form, then compute and output final grade
percentage and letter grade. Final percentage is rounded to the nearest
integer.
*/
const scoresForm = document.getElementById('scoresform');
const jsOutput = document.getElementById('javascript_output');

scoresForm.elements['submit'].addEventListener('click', processInput);
scoresForm.elements['reset'].addEventListener('click', clearResults);

jsOutput.style.whiteSpace = 'pre-line';  // preserve line breaks but not extra spaces in output

function processInput() {
  clearResults();
  const hwAvg = getIntFromInputElement('hwavg', 0, 100);
  const midExam = getIntFromInputElement('midterm', 0, 100);
  const finalExam = getIntFromInputElement('finalexam', 0, 100);
  const participation = getIntFromInputElement('participation', 0, 100);

  if (hwAvg !== null && !midExam !== null && finalExam !== null && participation !== null) {
    const finalPercent = Math.round((0.5 * hwAvg) + (0.2 * midExam) + (0.2 * finalExam) + (0.1 * participation));
    let outputText = 'Final Percentage: ' + finalPercent + '\nLetter Grade: ';
    
    if (finalPercent >= 90) {
      outputText += 'A';
    } else if (finalPercent >= 80) {
      outputText += 'B';
    } else if (finalPercent >= 70) {
      outputText += 'C';
    } else {
      if (finalPercent >= 60) {
        outputText += 'D';
      } else {
        outputText += 'F';
      }
      outputText += '\nStudent must retake the course.';
    }

    jsOutput.textContent = outputText;
  }
}

function getIntFromInputElement(inputId, min, max) {
  // If valid input, return parsed int, else output error message and return null.
  // Input is invalid if not an integer or < min (if defined) or > max (if defined).
  const input = document.getElementById(inputId);
  const parsedInt = parseInt(input.value, 10);
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
    return null;
  }
}

function clearResults() {
  jsOutput.textContent = '';
}