function registerUser() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('sname').value;
    const group = document.getElementById('ngroup').value;
    const password = document.getElementById('pass').value;

    if (!name || !surname || !group || !password) {
        alert("Заполните все поля!");
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, group, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Регистрация успешна!");
            localStorage.setItem('isRegistered', 'true'); // Сохраняем состояние
            window.location.href = '/';
        } else {
            alert("Ошибка: " + data.error);
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

function login() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('sname').value;
    const group = document.getElementById('ngroup').value;
    const password = document.getElementById('pass').value;

    if (!name || !surname || !group || !password) {
        alert("Заполните все поля!");
        return;
    }

    console.log("Данные для отправки на сервер:", { name, surname, group, password });

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, group, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Вход успешен!");
            localStorage.setItem('isRegistered', 'true'); // Сохраняем состояние
            window.location.href = '/';
        } else {
            alert("Ошибка: " + data.error);
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

