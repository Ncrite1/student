console.log("Скрипт script.js загружен!");

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
    disciplineBlock.style.marginTop = "20px"; // Добавляем отступ сверху

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
            disciplines.push(disciplineName);
        }
    });

    if (disciplines.length > 0) {
        console.log("Отправляемые данные:", JSON.stringify({ disciplines }));

        fetch('/save_disciplines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ disciplines }) 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Дисциплины сохранены!");
                console.log("Сохраненные дисциплины:", disciplines);
            } else {
                alert("Ошибка при сохранении: " + data.error);
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при сохранении дисциплин");
        });
    } else {
        alert("Пожалуйста, добавьте хотя бы одну дисциплину.");
    }
}

async function sendVerification() {
    const email = document.getElementById("email").value;
    const response = await fetch("/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    alert(await response.text());
}

    async function verifyCode() {
        const code = document.getElementById("code").value;
        const response = await fetch("/verify-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });
        alert(await response.text());
    }

function go_login() {
    window.location.href = '/login';
}

function go_reg() {
    window.location.href = '/reg';
}

document.addEventListener("DOMContentLoaded", function () {
    loadUserProfile();
});

function loadUserProfile() {
    const userId = localStorage.getItem('userId');  // Получаем сохранённый ID пользователя

    if (!userId) {
        alert("Ошибка: пользователь не авторизован!");
        window.location.href = '/login.html';  // Перенаправляем на страницу входа
        return;
    }

    fetch(`/user/${userId}`)  // Запрашиваем данные с сервера
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("userName").textContent = data.user.name;
                document.getElementById("userEmail").textContent = data.user.email;
                document.getElementById("userBalance").textContent = data.user.balance;
            } else {
                alert("Ошибка загрузки профиля: " + data.error);
            }
        })
        .catch(error => console.error("Ошибка запроса:", error));
}


document.addEventListener("DOMContentLoaded", async function () {
    console.log("Скрипт загружен!");

    try {
        const response = await fetch('/api/products');
        console.log("Статус ответа:", response.status);

        const data = await response.json();
        console.log("Полученные данные:", data);

        if (!Array.isArray(data)) {
            throw new Error("Ошибка: данные не являются массивом!");
        }

        const productGrid = document.querySelector('.product-grid');
        console.log("Контейнер найден:", productGrid);

        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productImage = document.createElement('img');
            productImage.src = `/uploads/${product.image}`;  // Проверь путь!
            productImage.alt = product.name;
            productImage.classList.add('product-image');
            productCard.appendChild(productImage);

            const productName = document.createElement('div');
            productName.classList.add('product-name');
            productName.textContent = product.name;
            productCard.appendChild(productName);

            const productPrice = document.createElement('div');
            productPrice.classList.add('product-price');
            productPrice.textContent = `$${product.price}`;
            productCard.appendChild(productPrice);
            

            const productPage = document.createElement('button');
            productPage.classList.add('buy-btn');
            productPage.textContent = 'Страница товара'
            productCard.appendChild(productPage)
            productPage.addEventListener('click', () => {
                window.location.href = `/product/${product.id}`;
            });
            

            productCard.appendChild(productPage);
            productGrid.appendChild(productCard);
        });

    } catch (error) {
        console.error("Ошибка загрузки:", error);
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOMContentLoaded сработал!");

    try {
        console.log("Отправка запроса к /api/products...");
        const response = await fetch('/api/products');

        console.log("Ответ получен!", response);
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Полученные данные:", data);
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
});

// Получаем кнопку и добавляем обработчик события
document.getElementById('buyBtn').addEventListener('click', async function() {
    // Получаем productId из атрибута data-product-id
    const productId = this.getAttribute('data-product-id');
    
    // Предположим, что userId доступен глобально
    const userId = 1;  // Замените на реальный userId

    // Вызов функции buy с userId и productId
    await buy(userId, productId);
});


async function buy(userId, productId) {
    try {
        // Отправляем запрос на сервер, чтобы выполнить покупку
        const response = await fetch(`/buy/${userId}/${productId}`, { method: 'POST' });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);  // Покажем сообщение об успешной покупке
        } else {
            console.error("Ошибка при покупке товара");
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
    }
}
