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
    const productId = this.getAttribute('data-product-id');
    
    // Получаем userId из localStorage
    const userId = localStorage.getItem('userId');

    if (!userId && !sessionStorage.getItem('authErrorShown')) {
        alert("Ошибка: пользователь не авторизован!");
        sessionStorage.setItem('authErrorShown', 'true'); // Запоминаем, что ошибка была показана
        window.location.href = '/reg';
    }

    console.log("Передача в buy(): userId =", userId, "productId =", productId);

    await buy(userId, productId);
});


async function buy(userId, productId) {
    try {
        console.log(`Попытка покупки товара ID: ${productId} пользователем ID: ${userId}`);

        // 1. Запрашиваем цену товара из базы данных
        const productResponse = await fetch(`/api/product/${productId}`);
        const productData = await productResponse.json();

        console.log("Передача в buy(): userId =", userId, "productId =", productId);

        if (!productResponse.ok) {
            throw new Error(productData.message || "Ошибка при получении информации о товаре");
        }

        let productPrice = parseFloat(productData.price);
        console.log(`Цена товара: ${productPrice}`);

        if (isNaN(productPrice)) {
            throw new Error("Ошибка: Некорректная цена товара");
        }

        // 2. Получаем текущий баланс пользователя
        const balanceResponse = await fetch(`/api/user/${userId}/balance`);
        const balanceData = await balanceResponse.json();

        if (!balanceResponse.ok) {
            throw new Error(balanceData.message || "Ошибка при получении баланса");
        }

        let currentBalance = parseFloat(balanceData.balance);
        console.log(`Баланс пользователя: ${currentBalance}`);

        if (isNaN(currentBalance)) {
            throw new Error("Ошибка: Некорректные данные баланса");
        }

        // 3. Проверяем баланс
        if (currentBalance < productPrice) {
            alert("Недостаточно средств для покупки!");
            return;
        }

        // 4. Отправляем запрос на покупку
        const buyResponse = await fetch(`/api/buy/${userId}/${productId}`, { method: 'POST' });
        const buyData = await buyResponse.json();

        if (!buyResponse.ok) {
            throw new Error(buyData.message || "Ошибка при покупке");
        }

        // 5. Показываем новый баланс
        let newBalance = currentBalance - productPrice;
        alert(`Покупка успешна! Остаток: $${newBalance.toFixed(2)}`);

    } catch (error) {
        console.error("Ошибка при выполнении покупки:", error);
        alert("Ошибка: " + error.message);
    }
}

async function recordPurchase(userId, productId) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO purchases (user_id, product_id) VALUES (?, ?)`;
        db.run(sql, [userId, productId], function (err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID); // возвращаем ID добавленной записи
        });
    });
}

// Функция для загрузки истории покупок
document.addEventListener('DOMContentLoaded', function() {
    const purchasesContainer = document.querySelector('.purchase-list');
    
    if (purchasesContainer) {
        console.log(purchasesContainer); // Проверим, что элемент найден
    } else {
        console.log("Элемент с классом .purchase-list не найден");
    }

    async function fetchPurchases(userId) {
        try {
            const response = await fetch(`/api/purchases/${userId}`);
            
            if (!response.ok) {
                throw new Error("Ошибка при получении покупок");
            }

            const data = await response.json();
            console.log("Данные о покупках:", data);  // Логируем данные

            if (purchasesContainer) {
                purchasesContainer.innerHTML = '';

                if (data && data.length > 0) {
                    data.forEach(purchase => {
                        const purchaseItem = document.createElement('div');
                        purchaseItem.classList.add('purchase-item');

                        purchaseItem.innerHTML = `
                            <div class="purchase-info">
                                <span class="product-name">${purchase.productName}</span>
                                <span class="purchase-date">Дата покупки: ${new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                            </div>
                            <div class="purchase-price">
                                <span>Цена: $${purchase.productPrice.toFixed(2)}</span>
                            </div>
                        `;
                        purchasesContainer.appendChild(purchaseItem);
                    });
                } else {
                    purchasesContainer.innerHTML = '<p>У вас нет покупок.</p>';
                }
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert('Не удалось загрузить покупки');
        }
    }

    fetchPurchases(2); // Пример вызова с ID пользователя
});
