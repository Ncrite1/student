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
            productPage.textContent = 'Подробнее'
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

const buyButton = document.getElementById('buyBtn');
console.log("Кнопка buyBtn:", buyButton);

if (!buyButton) {
    console.error("Ошибка: кнопка #buyBtn не найдена в DOM!");
}

// Получаем кнопку и добавляем обработчик события
document.getElementById('buyBtn').addEventListener('click', async function() {
    const productId = this.getAttribute('data-product-id');
    
    // Получаем userId из localStorage
    const userId = localStorage.getItem('userId');

    
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


function filter_button (){
    if (filterWindow.style.display === "none" || filterWindow.style.display === "") {
        filterWindow.style.display = "block"; // Показываем окно
    } else {
        filterWindow.style.display = "none"; // Скрываем окно
    }
}


function search_button() {
    const searchName = document.getElementById("search-name").value; // Получаем значение из input

    let modifiedSearchName = searchName; // Если длина меньше 6, не меняем строку

    if (searchName.length > 6) {
        modifiedSearchName = searchName.slice(0, -3); // Убираем последние 3 символа, если длина больше 6
    }

    fetchProducts(modifiedSearchName); // Передаем измененное имя для поиска
    console.log('grrgggr');
}

function fetchProducts(modifiedSearchName) {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.filter(product => {
                return containsSequence(product.name.toLowerCase(), modifiedSearchName.toLowerCase());
            });

            displayProducts(filteredProducts);
        })
        .catch(error => {
            console.error('Ошибка при получении данных товаров:', error);
        });
}

function containsSequence(productName, searchStr) {
    let j = 0; // Индекс для строки поиска

    // Проходим по символам в названии товара
    for (let i = 0; i < productName.length; i++) {
        if (productName[i] === searchStr[j]) {
            j++; // Если символы совпали, переходим к следующему символу из searchStr
        }
        if (j === searchStr.length) {
            return true; // Все символы из searchStr найдены в последовательности
        }
    }
    return false; // Если не нашли последовательности
}

function displayProducts(filteredProducts) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Очищаем контейнер перед добавлением новых товаров

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = `/uploads/${product.image}`; // Проверь путь!
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
        productPage.textContent = 'Подробнее';
        productCard.appendChild(productPage);
        
        productPage.addEventListener('click', () => {
            window.location.href = `/product/${product.id}`;
        });

        productGrid.appendChild(productCard);
    });
}

function applyFilters() {
    const checkboxes = document.querySelectorAll('input[name="tag"]:checked');
    const selectedTags = Array.from(checkboxes).map(cb => cb.value.trim());

    if (selectedTags.length === 0) {
        loadAllProducts();
        filterWindow.style.display = "none";
    }else{
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(product => {
                    if (!product.tags) return false;

                    const productTags = product.tags
                        .split(',')
                        .map(tag => tag.replace('×', '').trim());

                    return selectedTags.some(tag => productTags.includes(tag));
                });

                displayProducts(filtered);
            })
            .catch(err => {
                console.error('Ошибка при получении или фильтрации товаров:', err);
            });
            filterWindow.style.display = "none";
    }
}

function loadAllProducts() {
    fetch('/api/products')
        .then(res => res.json())
        .then(data => displayProducts(data))
        .catch(err => console.error('Ошибка при загрузке товаров:', err));
}

console.log(product.tags); // Проверь, что выводится правильное значение

