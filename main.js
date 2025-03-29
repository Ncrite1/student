function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    if (!name || !email || !password) {
        alert("Заполните все поля!");
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Ответ от сервера:", data);

        if (data.success) {
            alert("Регистрация успешна!");
            localStorage.setItem('isRegistered', 'true'); 
            localStorage.setItem('userId', data.user.id);   // ⬅ Сохраняем ID пользователя
            localStorage.setItem('userName', data.user.name);
            window.location.href = '/';
        } else {
            alert("Ошибка: " + data.error);
        }
    })
    .catch(error => console.error('Ошибка запроса:', error));
}

function login() {
    console.log("Функция login() вызвана!");
    const name = document.getElementById('name').value;
    const pass = document.getElementById('pass').value;

    if (!name || !pass) {
        alert("Заполните все поля!");
        return;
    }

    console.log("Отправка данных на сервер:", { name, pass });

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, pass })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Ответ сервера:", data);

        if (data.success) {
            alert("Вход успешен!");
            localStorage.setItem('isRegistered', 'true');
            localStorage.setItem('userId', data.user.id);   // ⬅ Сохраняем ID пользователя
            localStorage.setItem('userName', data.user.username);
            window.location.href = '/';
        } else {
            alert("Ошибка: " + data.error);
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

function logout() {
    localStorage.setItem('isRegistered', 'false');
    localStorage.removeItem('userId'); // Удаляем userId
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

function go_reg() {
    window.location.href = '/reg';
}

function profile(){
    window.location.href = '/profile';
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleNameMenu() {
    const menu = document.getElementById("NameMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function is_user_login(event, url) {
    if (localStorage.getItem('isRegistered') !== 'true') {
        alert("Пожалуйста, зарегистрируйтесь!");
        event.preventDefault();
    } else {
        window.location.href = url; // Переход после проверки
    }
}