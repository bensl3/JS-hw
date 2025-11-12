/*
Get input U.S. state name or abbreviation (case-insensitive) from a form.
Output that state's census data if found. Otherwise, output error message.
*/
// July 2024 census data: 'State Abbr', 'State Name', 'Capital', 'Population'
const censusData = [
  ['AL', 'Alabama', 'Montgomery', 5157699],
  ['AK', 'Alaska', 'Juneau', 740133],
  ['AZ', 'Arizona', 'Phoenix', 7582384],
  ['AR', 'Arkansas', 'Little Rock', 3088354],
  ['CA', 'California', 'Sacramento', 39431263],
  ['CO', 'Colorado', 'Denver', 5957493]
];
const validStateInputs = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
  'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];
const form = document.getElementById('stateForm');
const jsOutput = document.getElementById('javascript_output');

jsOutput.style.whiteSpace = 'pre-wrap';  // preserve whitespace and wrap

form.elements['reset'].addEventListener('click', clearResults);
form.addEventListener('submit', (event) => {
  event.preventDefault();  // prevent reload if press Enter in input field
  processInput();
});

function processInput() {
  const stateInput = form.elements['state'].value.trim().toLowerCase();

  if (validStateInputs.map(x => x.toLowerCase()).includes(stateInput)) {
    let stateFound = false;
    for (let i = 0; i < censusData.length; i++) {
      const stateData = censusData[i];
      if (stateInput === stateData[0].toLowerCase() || stateInput === stateData[1].toLowerCase()) {
        jsOutput.textContent = 'Thanks for your inquiry, here is the information you requested:\n';

        const outDiv = document.createElement('div');  // div for formatting
        outDiv.style.whiteSpace = 'pre';  // preserve whitespace and nowrap
        jsOutput.append(outDiv);
        outDiv.textContent =
`State abbr = ${stateData[0]}
State Name = ${stateData[1]}
Capital = ${stateData[2]}
Population = ${stateData[3].toLocaleString()}
`;
        stateFound = true;
        break;
      }
    }

    if (!stateFound) {
      const statesList = censusData.map(stateData => stateData[1] + ` (${stateData[0]})`).sort();
      jsOutput.textContent = 'Sorry, we do not have information about this state! We only have information about ' +
        `${statesList.slice(0, -1).join(', ')} and ${statesList[statesList.length - 1]}.`;
    }
  } else {
    jsOutput.textContent = 'Invalid: Input must be one of the 50 U.S. states; try checking the spelling.'
    form.elements['state'].select();
  }
}

function clearResults() {
  jsOutput.textContent = '';
  form.elements['state'].focus();
}
