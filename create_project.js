function create_product(event) {
    // Отменяем стандартное поведение формы (перезагрузку страницы)
    event.preventDefault();

    // Получаем данные из формы
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').files[0]; // Получаем выбранный файл

    // Проверяем, что все поля заполнены
    if (!name || !description || !price || !image) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Создаем FormData для отправки файла на сервер
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    // Отправляем данные на сервер
    fetch('/create-product', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Товар успешно создан!");
            window.location.href = '/';  // Перенаправление на главную страницу (или куда угодно)
        } else {
            alert("Ошибка: " + data.error);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert("Произошла ошибка при отправке данных.");
    });
}

// Добавляем обработчик события для отправки формы
document.getElementById('createProductForm').addEventListener('submit', create_product);
