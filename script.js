document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/api/courses')
        .then(response => {
            console.log('Ответ от прокси:', response);
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные:', data);

            const coursesList = document.getElementById('courses-list');
            if (data.courses && data.courses.length > 0) {
                data.courses.forEach(course => {
                    const courseItem = document.createElement('a');
                    courseItem.href = '#';
                    courseItem.classList.add('list-group-item', 'list-group-item-action');
                    courseItem.textContent = course.name;
                    coursesList.appendChild(courseItem);
                });
            } else {
                coursesList.innerHTML = "<p class='text-muted'>Курсы не найдены</p>";
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
});