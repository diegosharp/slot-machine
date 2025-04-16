
function createPayoutsTable() {
    const tableContainer = document.querySelector('.container-middle.neumorphism-container');

    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headers = ['Item Name', 'Image', 'Payout'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.style.width = '33%'; 
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    items.forEach(item => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const imageCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = "/images/" +  item.path; 
        img.alt = item.name;
        img.style.width = '50px'; 
        img.style.height = '50px';
        imageCell.appendChild(img);
        imageCell.style.width = '33%';
        row.appendChild(imageCell);

        const payoutCell = document.createElement('td');
        payoutCell.textContent = "x" + item.payout; 
        row.appendChild(payoutCell);

        table.appendChild(row);
    });

    table.style.width = '50%'
    table.style.borderCollapse = 'collapse';

    tableContainer.appendChild(table);
}

document.addEventListener('DOMContentLoaded', createPayoutsTable);
