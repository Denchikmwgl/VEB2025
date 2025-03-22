const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/courses', async(req, res) => {
    try {
        const apiUrl = 'http://exam-api-courses.std-900.ist.mospolytech.ru/api/courses?api_key=b78c42e5-091f-4814-b2af-6bafd7670be9';
        console.log('Запрос к API:', apiUrl);

        const response = await fetch(apiUrl);
        console.log('Ответ от API:', response.status, response.statusText);

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Данные от API:', data);

        res.json(data);
    } catch (error) {
        console.error('Ошибка прокси:', error);
        res.status(500).json({ error: 'Ошибка при загрузке данных', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});