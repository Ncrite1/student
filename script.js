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
        console.log("Ответ от сервера:", data); // <-- добавил лог
        if (data.success) {
            alert("Регистрация успешна!");
            localStorage.setItem('isRegistered', 'true'); 
            if (data.user) { 
                localStorage.setItem('userName', data.user.name);
                window.location.href = '/';
            } else {
                alert("Ошибка: сервер не отправил имя пользователя");
            }
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, group, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Ответ сервера:", data); // Выводим ответ сервера в консоль
    
        if (data.success) {
            alert("Вход успешен!");
            localStorage.setItem('isRegistered', 'true');
            
            if (data.user) { 
                localStorage.setItem('userName', data.user.name);  // Проверяем, есть ли `user`
                window.location.href = '/';
            } else {
                alert("Ошибка: сервер не отправил имя пользователя");
            }
        } else {
            alert("Ошибка: " + data.error);
        }
    })
    .catch(error => console.error('Ошибка:', error));
    
}

function logout() {
    localStorage.setItem('isRegistered', 'false');
    window.location.href = '/';

}

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('isRegistered') === 'true') {
        const login_button = document.getElementById('login_button');
        const acc_name = document.getElementById('acc_name');
        const userName = localStorage.getItem('userName'); 
        if (login_button) {
            login_button.style.display = 'none'; // Скрываем входа
            acc_name.textContent = userName
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('isRegistered') === 'false') {
        const logout_button = document.getElementById('logout_button');
        if (logout_button) {
            logout_button.style.display = 'none'; // Скрываем выхода
        }
    }
});

function go_login() {
    window.location.href = '/users';
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function is_user_login(event) {
    if (localStorage.getItem('isRegistered') !== 'true') {
        alert("Пожалуйста, зарегистрируйтесь!");
        event.preventDefault();
    } else {
        window.location.href = targetUrl; // Переход после проверки
    }
}
