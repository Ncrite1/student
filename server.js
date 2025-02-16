const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();  // Подключаем SQLite
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


// Создаем подключение к базе данных SQLite
const db = new sqlite3.Database('C:/Users/Ncrite/Documents/db/stud.db');  // Путь к файлу базы данных

// Указываем, что все статичные файлы (HTML, CSS, JS) будут находиться в папке wd
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());  // Разбор JSON-запросов
app.use(express.json()); // Обрабатывает JSON-запросы
app.use(express.urlencoded({ extended: true })); // Обрабатывает form-data

// Главная страница, отдающая main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));  // Отдаем main.html из текущей директории
});

// Страница пользователей
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'users.html'));  // Отдаем users.html из текущей директории
    
});



app.post('/register', (req, res) => {
    const { name, surname, group, password } = req.body;

    console.log("Получены данные:", req.body); // Выведет в консоль, что приходит

    if (!name || !surname || !group || !password) {
        return res.json({ success: false, error: "Заполните все поля" });
    }

    db.run('INSERT INTO users (name, sname, ngroup, pass) VALUES (?, ?, ?, ?)', 
        [name, surname, group, password], 
        function(err) {
            if (err) {
                console.error("Ошибка при добавлении в БД:", err.message);
                return res.status(500).json({ success: false, error: "Ошибка при добавлении" });
            }

            res.json({ success: true });
        }
        
    );
});

app.post('/login', (req, res) => {
    const { name, surname, group, password } = req.body;

    console.log("Получены данные:", req.body); // Проверим, что данные приходят

    if (!name || !surname || !group || !password) {
        return res.json({ success: false, error: "Заполните все поля" });
    }

    db.get('SELECT * FROM users WHERE name = ? AND sname = ? AND ngroup = ?', [name, surname, group], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, error: "Ошибка сервера" });
        }
        if (!row) {
            return res.json({ success: false, error: "Пользователь не найден" });
        }

        // Проверка пароля
        if (row.pass !== password) {
            return res.json({ success: false, error: "Неверный пароль" });
        }

        res.json({ success: true });
    });
});



// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});