const userId = localStorage.getItem('userId');

if (userId) {
    console.log("Полученный userId:", userId);
} else {
    console.log("userId не найден в localStorage");
}

document.addEventListener("DOMContentLoaded", function () {
    loadUserProfile();
});

function loadUserProfile() {

    fetch(`/user/${userId}`)  // Запрашиваем данные с сервера
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("userName").textContent = data.user.name;
                document.getElementById("userEmail").textContent = data.user.email;
                document.getElementById("userBalance").textContent = data.user.balance;
            } else {

            }
        })
        .catch(error => console.error("Ошибка запроса:", error));
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
document.addEventListener("DOMContentLoaded", async function () {
    const purchaseList = document.querySelector(".purchase-list");
    
    try {
        const response = await fetch(`/api/purchases/${userId}`);
        if (!response.ok) {
            throw new Error("Ошибка загрузки данных");
        }
        
        const purchases = await response.json();
        
        purchases.forEach(purchase => {
            const purchaseItem = document.createElement("div");
            purchaseItem.classList.add("purchase-item");
            purchaseItem.innerHTML = `
                <div class="purchase-info">
                    <span class="product-name">${purchase.productName}</span>
                    <span class="purchase-date">Дата покупки: ${new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div class="purchase-price">
                    <span>Цена: $${purchase.productPrice.toFixed(2)}</span>
                </div>
            `;
            
            purchaseItem.addEventListener("click", () => {
                window.location.href = `/product/${purchase.productId}`;
            });
            
            purchaseList.appendChild(purchaseItem);
        });
    } catch (error) {
        console.error("Ошибка при загрузке истории покупок:", error);
        purchaseList.innerHTML = "<p>Не удалось загрузить данные.</p>";
    }
});

function go_main (){
    window.location.href = '/';
}
