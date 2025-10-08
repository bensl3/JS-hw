/*
Use 'for' loop to calculate the product and sum of every fourth integer from 5
 to 25 inclusive then display the results.
Use 'while' loop to calculate the product and sum of every third integer from 3
 to 18 inclusive then display the results.
*/
const forOutput = document.getElementById('forloop_output');
const whileOutput = document.getElementById('whileloop_output');

forOutput.style.whiteSpace = 'pre-wrap';  // preserve whitespace and wrap
whileOutput.style.whiteSpace = 'pre-wrap';

let start = 5;
let end = 25;
let step = 4;

let product = start;
let sum = start;
let productString = 'The result of ' + start.toLocaleString();
let sumString = 'The result of ' + start.toLocaleString();
for (let i = start + step; i <= end; i += step) {
    productString += ' * ' + i.toLocaleString();
    sumString += ' + ' + i.toLocaleString();
    product *= i;
    sum += i;
}
productString += ' is ' + product.toLocaleString() + '.';
sumString += ' is ' + sum.toLocaleString() + '.';

forOutput.textContent = productString + '\n' + sumString;

start = 3;
end = 18;
step = 3;

product = start;
sum = start;
productString = 'The result of ' + start.toLocaleString();
sumString = 'The result of ' + start.toLocaleString();
let i = start + step;
while (i <= end) {
    productString += ' * ' + i.toLocaleString();
    sumString += ' + ' + i.toLocaleString();
    product *= i;
    sum += i;

    i += step
}
productString += ' is ' + product.toLocaleString() + '.';
sumString += ' is ' + sum.toLocaleString() + '.';

whileOutput.textContent = productString + '\n' + sumString;
