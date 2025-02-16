document.addEventListener('DOMContentLoaded', function() {
    fetch('/users-data')  // Запрос к серверу на получение данных о пользователях
        .then(response => response.json())
        .then(data => {
            const userTable = document.getElementById('user-table');
            data.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
                userTable.appendChild(row);  // Добавляем строку в таблицу
            });
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
});
