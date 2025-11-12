/*
Create currency output rows and insert them before the US currency input row
  in the currencies table. The columns in order are: Currency, Rate, Value.
Then, listen for and update the currency output values when the US input value
  changes.
*/
// IDs in HTML file
const currenciesTableId = 'currencies_table';
const USrowId = 'USinputrow';
const USinputId = 'USinput';

// IDs for elements created in this file
const euroValueId = 'euroValue';
const canadaValueId = 'canadaValue';
const hongKongValueId = 'hongKongValue';
const japanValueId = 'japanValue';
const mexicoValueId = 'mexicoValue';

// Values for currency output rows
const euroCurrency = 'Euro';
const canadaCurrency = 'Canadian Dollar';
const hongKongCurrency = 'Hong Kong Dollar';
const japanCurrency = 'Japanese Yen';
const mexicoCurrency = 'Mexican Peso';
const euroRate = 0.92;
const canadaRate = 1.38;
const hongKongRate = 7.81;
const japanRate = 156.73;
const mexicoRate = 18.41;

function createCurrencyOutRow(currency, rate, valueElement) {
  const currencyRow = document.createElement('tr');
  currencyRow.append(createTdWithText(currency));
  currencyRow.append(createTdWithText(rate));
  currencyRow.append(createTdWithElement(valueElement));
  return currencyRow;
}

function createTdWithText(cellText) {
  const cellElement = document.createElement('td');
  cellElement.textContent = cellText;
  return cellElement;
}

function createTdWithElement(childElement) {
  const cellElement = document.createElement('td');
  cellElement.append(childElement);
  return cellElement;
}

function createValueOutElement(id) {
  const inputReadOnlyElement = document.createElement('input');
  inputReadOnlyElement.id = id;
  inputReadOnlyElement.type = 'text';
  inputReadOnlyElement.readOnly = true;
  return inputReadOnlyElement;
}

// New elements to receive currency output values
const euroOutElement = createValueOutElement(euroValueId);
const canadaOutElement = createValueOutElement(canadaValueId);
const hongKongOutElement = createValueOutElement(hongKongValueId);
const japanOutElement = createValueOutElement(japanValueId);
const mexicoOutElement = createValueOutElement(mexicoValueId);

// Create and insert currency output rows before the US currency input row.
const USinputRow = document.getElementById(USrowId);
const currenciesTbody = document.getElementById(currenciesTableId).getElementsByTagName('tbody')[0];
currenciesTbody.insertBefore(createCurrencyOutRow(euroCurrency, euroRate, euroOutElement),
               USinputRow);
currenciesTbody.insertBefore(createCurrencyOutRow(canadaCurrency, canadaRate, canadaOutElement),
               USinputRow);
currenciesTbody.insertBefore(createCurrencyOutRow(hongKongCurrency, hongKongRate, hongKongOutElement),
               USinputRow);
currenciesTbody.insertBefore(createCurrencyOutRow(japanCurrency, japanRate, japanOutElement),
               USinputRow);
currenciesTbody.insertBefore(createCurrencyOutRow(mexicoCurrency, mexicoRate, mexicoOutElement),
               USinputRow);


// Listen for changed input value, and update table.
const USinputElement = document.getElementById(USinputId);
USinputElement.addEventListener('input', processInput);
document.addEventListener('DOMContentLoaded', processInput);  // process initial input value

function processInput() {
  const USinputValue = parseFloat(USinputElement.value);
  const numDecimalPlaces = 2;

  if (isNaN(USinputValue)) {
    const message = 'Please enter a number with no whitespace.';
    euroOutElement.value = message;
    canadaOutElement.value = message;
    hongKongOutElement.value = message;
    japanOutElement.value = message;
    mexicoOutElement.value = message;
  } else {
    euroOutElement.value = convertAndRound(USinputValue, euroRate, numDecimalPlaces);
    canadaOutElement.value = convertAndRound(USinputValue, canadaRate, numDecimalPlaces);
    hongKongOutElement.value = convertAndRound(USinputValue, hongKongRate, numDecimalPlaces);
    japanOutElement.value = convertAndRound(USinputValue, japanRate, numDecimalPlaces);
    mexicoOutElement.value = convertAndRound(USinputValue, mexicoRate, numDecimalPlaces);
  }
}

function convertAndRound(amount, conversionRate, decimalPlaces) {
  const convertedAmount = amount * conversionRate;
  return convertedAmount.toFixed(decimalPlaces);
}