document.addEventListener("DOMContentLoaded", function() {
    const orderTableBody = document.getElementById('orderTableBody');
    const detailsModal = document.getElementById('detailsModal');
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteButton = document.getElementById('confirmDelete');

    let orders = []; // Массив для хранения записей

    // Загрузка записей при загрузке страницы
    loadOrders();

    // Функция для загрузки записей
    function loadOrders() {
        fetch('http://localhost:3000/api/orders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                orders = data;
                displayOrders(orders);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                orderTableBody.innerHTML = `<tr><td colspan="5" class="text-center">Не удалось загрузить записи. Пожалуйста, попробуйте позже.</td></tr>`;
            });
    }

    // Функция для отображения записей в таблице
    function displayOrders(orders) {
        orderTableBody.innerHTML = ''; // Очистить таблицу

        if (Array.isArray(orders) && orders.length > 0) {
            orders.forEach((order, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${order.courseName}</td>
                    <td>${order.date}</td>
                    <td>${order.status}</td>
                    <td>
                        <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="showDetails(${index})">Подробнее</button>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editOrder(${index})">Изменить</button>
                        <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="deleteOrder(${index})">Удалить</button>
                    </td>
                `;
                orderTableBody.appendChild(row);
            });
        } else {
            orderTableBody.innerHTML = `<tr><td colspan="5" class="text-center">Записи не найдены</td></tr>`;
        }
    }

    // Функция для отображения деталей записи
    window.showDetails = function(index) {
        const order = orders[index];
        const modalBody = detailsModal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <p>Название курса: ${order.courseName}</p>
            <p>Имя: ${order.userName}</p>
            <p>Email: ${order.userEmail}</p>
            <p>Дата: ${order.date}</p>
            <p>Статус: ${order.status}</p>
        `;
    };

    // Функция для редактирования записи
    window.editOrder = function(index) {
        const order = orders[index];
        const form = editModal.querySelector('form');
        form.editCourseName.value = order.courseName;
        form.editUserName.value = order.userName;
        form.editUserEmail.value = order.userEmail;
        form.editCourseDate.value = order.date;
        form.editStatus.value = order.status;

        form.onsubmit = function(event) {
            event.preventDefault();
            const updatedOrder = {
                ...order,
                courseName: form.editCourseName.value,
                userName: form.editUserName.value,
                userEmail: form.editUserEmail.value,
                date: form.editCourseDate.value,
                status: form.editStatus.value
            };

            // Отправка обновленных данных на сервер
            fetch(`http://localhost:3000/api/orders/${order.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedOrder)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    orders[index] = data;
                    displayOrders(orders);
                    bootstrap.Modal.getInstance(editModal).hide();
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Произошла ошибка при обновлении записи. Пожалуйста, попробуйте еще раз.');
                });
        };
    };

    // Функция для удаления записи
    window.deleteOrder = function(index) {
        const order = orders[index];
        confirmDeleteButton.onclick = function() {
            fetch(`http://localhost:3000/api/orders/${order.id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети: ' + response.statusText);
                    }
                    orders.splice(index, 1);
                    displayOrders(orders);
                    bootstrap.Modal.getInstance(deleteModal).hide();
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Произошла ошибка при удалении записи. Пожалуйста, попробуйте еще раз.');
                });
        };
    };
});