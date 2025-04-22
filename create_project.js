function create_product(event) {
    // Отменяем стандартное поведение формы (перезагрузку страницы)
    event.preventDefault();

    // Получаем данные из формы
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').files[0]; // Получаем выбранный файл
    const tagElements = document.querySelectorAll('#selected-tags .tag');
    const tags = Array.from(tagElements).map(tagEl => tagEl.textContent.trim());
    const tagString = tags.join(',');

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
    formData.append('tags', tagString);

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

function show_tags_tab(){
    if (tags_tab.style.display === "none" || tags_tab.style.display === "") {
        tags_tab.style.display = "block"; // Показываем окно
    } else {
        tags_tab.style.display = "none"; // Скрываем окно
    }
}

function add_tag(tagText) {
    const container = document.getElementById('selected-tags');

    // Проверяем, не добавлен ли уже такой тег
    const existingTags = Array.from(container.children).map(el => el.dataset.tag);
    if (existingTags.includes(tagText)) return;

    // Создаем тег
    const tagElement = document.createElement('div');
    tagElement.className = 'tag';
    tagElement.dataset.tag = tagText;
    tagElement.innerHTML = `${tagText} <span class="remove-tag" onclick="remove_tag(this)">×</span>`;

    container.appendChild(tagElement);
}

function remove_tag(closeButton) {
    const tag = closeButton.parentElement;
    tag.remove();
}

function go_main (){
    window.location.href = '/';
}