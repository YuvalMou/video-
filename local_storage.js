document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');
    const clientNameInput = document.getElementById('client-name');
    const resetButton = document.getElementById('reset-btn');

    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('tableData'));
    if (savedData) {
        clientNameInput.value = savedData.clientName;
        savedData.rows.forEach((row, index) => {
            const tableRow = table.rows[index + 1];
            tableRow.cells[0].textContent = row.startTime;
            tableRow.cells[1].textContent = row.endTime;
            tableRow.cells[2].textContent = row.videoNumber;
            tableRow.cells[3].querySelector('select').value = row.action;
            tableRow.cells[4].querySelector('input').value = row.notes;
        });
    }

    // Save data to localStorage
    const saveData = () => {
        const rows = Array.from(table.rows).slice(1).map(row => ({
            startTime: row.cells[0].textContent,
            endTime: row.cells[1].textContent,
            videoNumber: row.cells[2].textContent,
            action: row.cells[3].querySelector('select').value,
            notes: row.cells[4].querySelector('input').value
        }));
        const data = {
            clientName: clientNameInput.value,
            rows
        };
        localStorage.setItem('tableData', JSON.stringify(data));
    };

    // Save data on input change
    clientNameInput.addEventListener('input', saveData);
    table.addEventListener('input', saveData);

    // Clear data on reset
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('tableData');
        location.reload();
    });
});