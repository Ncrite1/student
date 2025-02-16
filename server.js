const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();  // Подключаем SQLite
const app = express();
const port = 3000;

// Создаем подключение к базе данных SQLite
const db = new sqlite3.Database('C:/Users/Ncrite/Documents/db/stud.db');  // Путь к файлу базы данных

// Указываем, что все статичные файлы (HTML, CSS, JS) будут находиться в папке wd
app.use(express.static(path.join(__dirname)));

// Главная страница, отдающая main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));  // Отдаем main.html из текущей директории
});

// Страница пользователей
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'users.html'));  // Отдаем users.html из текущей директории
});

app.get('/users-data', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});


// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});