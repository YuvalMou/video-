document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[data-collapse-toggle="mobile-menu"]');
    const menu = document.querySelector('#mobile-menu');
    toggleButton.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });
    const stopwatch = document.getElementById('stopwatch');
    const startSetButton = document.getElementById('start-set-btn');
    let startTime;
    let interval;
    startSetButton.addEventListener('click', () => {
        startTime = Date.now();
        if (interval) clearInterval(interval);
        interval = setInterval(() => {
            let elapsedTime = Date.now() - startTime;
            let hours = Math.floor(elapsedTime / 3600000);
            let minutes = Math.floor((elapsedTime % 3600000) / 60000);
            let seconds = Math.floor((elapsedTime % 60000) / 1000);
            stopwatch.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    });
    document.querySelectorAll('.start-time-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            let row = btn.closest('tr');
            row.cells[0].textContent = stopwatch.textContent;
        });
    });
    document.querySelectorAll('.end-time-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            let row = btn.closest('tr');
            row.cells[1].textContent = stopwatch.textContent;
        });
    });
    document.getElementById('export-btn').addEventListener('click', () => {
        let table = document.querySelector('table');
        let rows = Array.from(table.rows).filter(row => row.cells[0].textContent !== 'הקפאה');
        let clientName = document.getElementById('client-name').value;
        if (!clientName) {
            alert("Please enter the client's name.");
            return;
        }
        let csvContent = rows.map(row => {
            let cells = Array.from(row.cells);
            let actionSelect = cells[3].querySelector('select');
            let action = actionSelect ? actionSelect.value : '';
            let notesInput = cells[4].querySelector('input');
            let notes = notesInput ? notesInput.value : '';
            return [clientName, cells[0].textContent, cells[1].textContent, cells[2].textContent, action, notes].join(',');
        }).join('\n');
        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${clientName}_video_tasks.csv`;
        link.click();
    });
    });
    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.returnValue = '';
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        location.reload();
    });