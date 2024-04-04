document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/data2')
        .then(response => response.json())
        .then(data => {
            const dataContainer = document.getElementById('data-container');
            dataContainer.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
