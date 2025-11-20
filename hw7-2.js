/*
If cookies for name and username are found, show welcome message.
Otherwise, get name and username input from a form and save in cookies.
*/
const formContainer = document.getElementById('form_container');
const nameCookieKey = 'name';
const usernameCookieKey = 'username';

document.addEventListener('DOMContentLoaded', () => {
  const name = getCookie(nameCookieKey);
  const username = getCookie(usernameCookieKey);

  if (name !== '' && username !== '') {
    formContainer.style.whiteSpace = 'pre-wrap';
    formContainer.textContent = 'Welcome back ' + name + ' (username: ' + username + ')';
  } else {
    processForm();
  }
});

function getCookie(cKey) { // Return given cookie key's value or empty string if not found
  const cKeyEq = cKey + '=';
  const cookiesArray = document.cookie.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
    let c = cookiesArray[i];
    // Trim leading space(s) if exist
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    // If cookie key is found, return decoded value
    if (c.indexOf(cKeyEq) === 0) {
      const value = c.substring(cKeyEq.length, c.length);
      return decodeURIComponent(value);
    }
  }
  return '';  // Cookie key not found
}

function processForm() {
  const userForm = document.getElementById('user_form');
  const jsOutput = document.getElementById('js_output');

  userForm.addEventListener('submit', (event) => {
    event.preventDefault();  // prevent reload if press Enter in input field

    const name = userForm.elements['name'].value;
    const username = userForm.elements['username'].value;
    if (name.trim() === '' || username.trim() === '') {
      jsOutput.textContent = 'Error: Both fields must have non-whitespace characters.'
    } else {
      setCookie(nameCookieKey, name);
      setCookie(usernameCookieKey, username);
  
      jsOutput.textContent = 'Cookies saved! ';

      const reloadButton = document.createElement('button');
      reloadButton.textContent = 'Reload';
      reloadButton.addEventListener('click', () => {
        window.location.reload();
      });
      jsOutput.append(reloadButton);
    }
  });

  userForm.elements['reset'].addEventListener('click', () => {
    jsOutput.textContent = '';
  });
}

function setCookie(cKey, cValue, expDays) {
  let setCookieString = cKey + '=' + encodeURIComponent(cValue) + '; path=/';
  if (Number.isFinite(expDays)) {
    let d = new Date();
    d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
    setCookieString += '; expires=' + d.toUTCString();
  }
  document.cookie = setCookieString;
}

function deleteCookie(cKey) {
  setCookie(cKey, '', -1);
}
