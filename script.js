document.addEventListener("DOMContentLoaded", function() {
    const coursesList = document.getElementById('courses-list');
    const orderForm = document.getElementById('orderForm');
    const courseNameInput = document.getElementById('courseName');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const courseDateInput = document.getElementById('courseDate');

    // Загрузка курсов
    fetch('http://localhost:3000/api/courses')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(course => {
                const courseItem = document.createElement('a');
                courseItem.href = '#';
                courseItem.classList.add('list-group-item', 'list-group-item-action');
                courseItem.textContent = course.name;
                courseItem.addEventListener('click', () => {
                    courseNameInput.value = course.name;
                });
                coursesList.appendChild(courseItem);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            coursesList.innerHTML = '<div class="list-group-item">Не удалось загрузить курсы. Пожалуйста, попробуйте позже.</div>';
        });

    // Обработка формы записи на курс
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const order = {
            courseName: courseNameInput.value,
            userName: userNameInput.value,
            userEmail: userEmailInput.value,
            date: courseDateInput.value,
            status: 'Новая'
        };

        fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                alert('Вы успешно записаны на курс!');
                bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
                orderForm.reset(); // Очистка формы
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при записи на курс. Пожалуйста, попробуйте еще раз.');
            });
    });
});