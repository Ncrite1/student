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

function add_discipline() {
    // Создаем новую кнопку
    let newButton = document.createElement("button");
    newButton.className = "add_discipline";
    newButton.innerHTML = "+";
    newButton.onclick = add_discipline; // Добавляем обработчик, чтобы новые кнопки тоже могли создавать другие

    // Добавляем кнопку в контейнер
    document.getElementById("button_container").appendChild(newButton);
}

// Функция для добавления нового поля ввода и кнопки
function add_discipline() {
    const container = document.querySelector(".container_discipline");

    // Создаем новый блок дисциплины (с полем ввода и кнопками)
    const disciplineBlock = document.createElement("div");
    disciplineBlock.classList.add("disciplineBlock");

    // Создаем кнопку для удаления
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "-";
    removeButton.classList.add("add_discipline");
    removeButton.onclick = function() {
        remove_discipline(disciplineBlock); // Удаление текущего блока
    };

    // Создаем поле ввода для дисциплины
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Дисциплина";

    // Создаем кнопку для добавления
    const addButton = document.createElement("button");
    addButton.innerHTML = "+";
    addButton.classList.add("add_discipline");
    addButton.onclick = add_discipline; // Добавление нового поля

    // Добавляем все элементы в новый блок
    disciplineBlock.appendChild(removeButton);
    disciplineBlock.appendChild(input);
    disciplineBlock.appendChild(addButton);

    // Добавляем новый блок в контейнер
    container.appendChild(disciplineBlock);
}

// Функция для удаления блока с дисциплиной
function remove_discipline(disciplineBlock) {
    // Удаляем родительский блок дисциплины
    disciplineBlock.remove();

    // Показываем кнопку "+" снова, если нет других блоков
    const container = document.querySelector(".container_discipline");
    const existingBlocks = container.querySelectorAll(".disciplineBlock");
    if (existingBlocks.length === 0) {
        const addButton = document.createElement("button");
        addButton.innerHTML = "+";
        addButton.classList.add("add_discipline");
        addButton.onclick = add_discipline; // Добавление нового поля
        container.appendChild(addButton); // Добавляем кнопку обратно в контейнер
    }
}

// Функция для сохранения дисциплин (собирает данные из всех полей ввода)
function save_disciplines() {
    const inputs = document.querySelectorAll(".container_discipline input");
    const disciplines = [];

    inputs.forEach(input => {
        const disciplineName = input.value.trim();
        if (disciplineName) {
            disciplines.push(disciplineName); // Добавляем дисциплину в массив, если она не пустая
        }
    });

    if (disciplines.length > 0) {
        console.log("Сохраненные дисциплины:", disciplines);
        // Здесь вы можете отправить данные на сервер
        // Например:
        // fetch('/save-disciplines', { method: 'POST', body: JSON.stringify(disciplines) });
    } else {
        alert("Пожалуйста, добавьте хотя бы одну дисциплину.");
    }
}
