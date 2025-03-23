const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let orders = [];

// Прокси для запросов к API курсов
app.get('/api/courses', async(req, res) => {
    try {
        const apiUrl = 'http://exam-api-courses.std-900.ist.mospolytech.ru/api/courses?api_key=b78c42e5-091f-4814-b2af-6bafd7670be9';
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Ошибка прокси:', error);
        res.status(500).json({ error: 'Ошибка при загрузке данных', details: error.message });
    }
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Создать новую запись
app.post('/api/orders', (req, res) => {
    const order = req.body;
    order.id = orders.length + 1; // ID
    orders.push(order);
    res.json(order);
});

// Обновить запись
app.put('/api/orders/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedOrder = req.body;
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
        orders[index] = updatedOrder;
        res.json(updatedOrder);
    } else {
        res.status(404).json({ error: 'Запись не найдена' });
    }
});

// Удалить запись
app.delete('/api/orders/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
        orders.splice(index, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Запись не найдена' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});