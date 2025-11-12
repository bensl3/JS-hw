/*
Count how many times a given character appears in given content (case-insensitive).
If the character is not found, open a new window with not found message.
*/
const form = document.getElementById('contentForm');
const jsOutput = document.getElementById('javascript_output');

form.elements['reset'].addEventListener('click', clearResults);
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent reload if press Enter in input field
  processInput();
});

jsOutput.style.whiteSpace = 'pre-wrap';  // preserve whitespace and wrap

function processInput() {
  clearResults();
  const content = form.elements['content'].value.toLowerCase();
  const charToCount = form.elements['character'].value.toLowerCase();

  let count = 0;
  for (const char of content) {
    if (char === charToCount) {
      count++;
    }
  }
  if (count > 0) {
    jsOutput.textContent = `The character "${charToCount}" shows up in the content ${count} time(s).`
  } else {
    // place new window relative to the current window
    const top = window.screenTop + 400;
    const left = window.screenLeft + 500;

    const newWindow = window.open('', '_blank', `top=${top},left=${left},width=300,height=100`);
    newWindow.opener = null;   // this is for security!!!
    newWindow.focus();

    // below will add to the <html> element of the new window
    newWindow.document.documentElement.setAttribute('lang', 'en');

    newWindow.document.title = "HW6-2 Character Not Found";
    newWindow.document.body.innerHTML = `<p>Search character "${charToCount}" not found in the content you typed.</p>
    <input type="button" value="Close Window" onclick="window.close()">`;
    
    newWindow.document.close();
  }
}

function clearResults() {
  jsOutput.textContent = '';
}