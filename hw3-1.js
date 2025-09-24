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
    const hwAvg = parseInt(scoresForm.elements['hwavg'].value, 10);
    const midExam = parseInt(scoresForm.elements['midterm'].value, 10);
    const finalExam = parseInt(scoresForm.elements['finalexam'].value, 10);
    const participation = parseInt(scoresForm.elements['participation'].value, 10);

    if (!Number.isInteger(hwAvg) || !Number.isInteger(midExam)
            || !Number.isInteger(finalExam) || !Number.isInteger(participation)) {
        jsOutput.textContent = 'Input error. Make sure all inputs are integers with no whitespace.';
        console.log('hwAvg: ' + hwAvg + ', midExam: ' + midExam + ', finalExam: ' + finalExam + ', participation: ' + participation);
    } else if (hwAvg < 0 || hwAvg > 100 || midExam < 0 || midExam > 100
            || finalExam < 0 || finalExam > 100 || participation < 0 || participation > 100) {
        jsOutput.textContent = 'Input out of range. Make sure all values are between 0 and 100.';
    } else {  // inputs are integers between 0 and 100
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

function clearResults() {
    jsOutput.textContent = '';
}