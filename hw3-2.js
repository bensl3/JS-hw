/*
Get quantities sold for 4 items from a form. Then, calculate total amount
based on quantity sold times price for each item. Then, calculate total weekly
earnings equal to a base amount plus commission % of total amount sold.
Display results in a table with columns: Item#, Price, Qty Sold, Total $.
Also display total amount sold and total weekly earnings.
*/
const itemsForm = document.getElementById('items_sold_form');
const jsOutput = document.getElementById('script_output');

const baseWeeklyEarning = 250;
const commissionPercent = 0.09;
const item1Num = 1;
const item2Num = 2;
const item3Num = 3;
const item4Num = 4;
const item1Price = 20.99;
const item2Price = 12.75;
const item3Price = 9.95;
const item4Price = 35.89;
const numDecimalPlaces = 2;  // decimal places for money amounts

itemsForm.elements['submit'].addEventListener('click', processInput);
itemsForm.elements['reset'].addEventListener('click', () => {
    clearResults();
    printItemTotalsTable('', '', '', '');
});
document.addEventListener('DOMContentLoaded', printItemTotalsTable('', '', '', ''));

function createItemRow(itemNumber, itemPrice, qtySold, totalPrice) {
    const qtySoldElement = createReadOnlyElement();
    if (qtySold !== '') {
        qtySoldElement.value = qtySold;
    }
    const totalPriceElement = createReadOnlyElement();
    if (totalPrice !== '') {
        totalPriceElement.value = totalPrice.toFixed(numDecimalPlaces);
    }
    totalPriceElement.style.textAlign = 'right';

    const tableRow = document.createElement('tr');
    tableRow.append(createTableCellWithText(itemNumber));
    tableRow.append(createTableCellWithText('$' + itemPrice.toFixed(numDecimalPlaces)));
    tableRow.append(createTableCellWithElement(qtySoldElement));
    tableRow.append(createTableCellWithElement(totalPriceElement));

    return tableRow;
}

function createTotalRow(labelText, labelForValue, totalAmount) {
    const labelElement = document.createElement('label');
    labelElement.htmlFor = labelForValue;
    labelElement.textContent = labelText;

    const tdLabel = createTableCellWithElement(labelElement);
    tdLabel.colSpan = 3;

    const totalAmountElement = createReadOnlyElement(labelForValue);
    if (totalAmount !== '') {
        totalAmountElement.value = totalAmount.toFixed(numDecimalPlaces);
    }
    totalAmountElement.style.textAlign = 'right';

    const tdTotalAmount = createTableCellWithElement(totalAmountElement);

    const tableRow = document.createElement('tr');
    tableRow.append(tdLabel);
    tableRow.append(tdTotalAmount);

    return tableRow;
}

function createTableCellWithText(cellText, cellType = 'td') {
    const cellElement = document.createElement(cellType);
    cellElement.textContent = cellText;
    return cellElement;
}

function createTableCellWithElement(childElement, cellType = 'td') {
    const cellElement = document.createElement(cellType);
    cellElement.append(childElement);
    return cellElement;
}

function createReadOnlyElement(id = '') {
    const inputElement = document.createElement('input');
    if (id !== '') {
        inputElement.id = id;
    }
    inputElement.type = 'text';
    inputElement.readOnly = true;
    return inputElement;
}

function processInput() {
    clearResults();  // only show newest results
    const item1QtySold = parseInt(itemsForm.elements['item1'].value, 10);
    const item2QtySold = parseInt(itemsForm.elements['item2'].value, 10);
    const item3QtySold = parseInt(itemsForm.elements['item3'].value, 10);
    const item4QtySold = parseInt(itemsForm.elements['item4'].value, 10);

    if (!Number.isInteger(item1QtySold) || !Number.isInteger(item2QtySold)
            || !Number.isInteger(item3QtySold) || !Number.isInteger(item4QtySold)) {
        jsOutput.textContent = 'Input error. Make sure all inputs are integers with no whitespace.';
        console.log('item1: ' + item1QtySold + ', item2: ' + item2QtySold
                    + ', item3: ' + item3QtySold + ', item4: ' + item4QtySold);
    } else if (item1QtySold < 0 || item2QtySold < 0 || item3QtySold < 0 || item4QtySold < 0) {
        jsOutput.textContent = 'Input out of range. Make sure all values are greater than or equal to 0.';
    } else {  // inputs are integers >= 0
        printItemTotalsTable(item1QtySold, item2QtySold, item3QtySold, item4QtySold)
    }
}

function printItemTotalsTable(item1Qty, item2Qty, item3Qty, item4Qty) {
    const totalsTable = document.createElement('table');
    let currentRow = document.createElement('tr');

    let item1Total = '';
    let item2Total = '';
    let item3Total = '';
    let item4Total = '';
    let totalAmountSold = '';
    let totalEarnings = '';

    if (item1Qty !== '' && item2Qty !== '' && item3Qty !== '' && item4Qty !== '') {
        item1Total = item1Qty * item1Price;
        item2Total = item2Qty * item2Price;
        item3Total = item3Qty * item3Price;
        item4Total = item4Qty * item4Price;
        totalAmountSold = item1Total + item2Total + item3Total + item4Total;
        totalEarnings = baseWeeklyEarning + (commissionPercent * totalAmountSold);
    }

    // Table headers
    const totalsTableHead = document.createElement('thead')
    currentRow.append(createTableCellWithText('Item#', 'th'));
    currentRow.append(createTableCellWithText('Price', 'th'));
    currentRow.append(createTableCellWithText('Qty Sold', 'th'));
    currentRow.append(createTableCellWithText('Total $', 'th'));
    totalsTableHead.append(currentRow);
    
    // Table body
    const totalsTableBody = document.createElement('tbody');
    currentRow = createItemRow(item1Num, item1Price, item1Qty, item1Total);
    totalsTableBody.append(currentRow);
    currentRow = createItemRow(item2Num, item2Price, item2Qty, item2Total);
    totalsTableBody.append(currentRow);
    currentRow = createItemRow(item3Num, item3Price, item3Qty, item3Total);
    totalsTableBody.append(currentRow);
    currentRow = createItemRow(item4Num, item4Price, item4Qty, item4Total);
    totalsTableBody.append(currentRow);

    // Table foot
    const totalsTableFoot = document.createElement('tfoot');
    currentRow = createTotalRow('Total Amount Sold', 'totalsold', totalAmountSold);
    totalsTableFoot.append(currentRow);
    currentRow = createTotalRow('Total Weekly Earnings', 'totalearnings', totalEarnings);
    totalsTableFoot.append(currentRow);

    totalsTable.append(totalsTableHead);
    totalsTable.append(totalsTableBody);
    totalsTable.append(totalsTableFoot);
    jsOutput.append(totalsTable);
}

function clearResults() {
    jsOutput.textContent = '';
}
