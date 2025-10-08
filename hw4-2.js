/*
Output multiplication tables, one below the other, for a range of integer
 multipliers.
*/
const jsOutput = document.getElementById('js_output');
const start = 5;
const end = 9;

function createTableRow(text1, text2, text3, cellType = 'td') {
    const tableRow = document.createElement('tr');
    tableRow.append(createTableCellWithText(text1, cellType));
    tableRow.append(createTableCellWithText(text2, cellType));
    tableRow.append(createTableCellWithText(text3, cellType));
    return tableRow;
}

function createTableCellWithText(cellText, cellType = 'td') {
    const cellElement = document.createElement(cellType);
    cellElement.textContent = cellText;
    return cellElement;
}

for (let multiplier = start; multiplier <= end; multiplier += 1) {
    const multiplicationTable = document.createElement('table');
    multiplicationTable.className = 'mult_table';  // for external CSS style

    const tableHead = document.createElement('thead');
    tableHead.append(createTableRow('Number', 'Multiplier', 'Result', 'th'));

    const tableBody = document.createElement('tbody');
    for (let i = 1; i <= 9; i += 1) {
        product = i * multiplier;
        tableBody.append(createTableRow(i.toLocaleString(), multiplier.toLocaleString(), product.toLocaleString()));
    }

    multiplicationTable.append(tableHead, tableBody);
    jsOutput.append(multiplicationTable);
}
