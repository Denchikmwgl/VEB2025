document.addEventListener("DOMContentLoaded", function() {
    // Контейнер для хранения названий курсов
    let courseNames = [];
    const coursesContainer = document.getElementById('courses-list');
    const searchInput = document.getElementById('search');
    const searchForm = document.querySelector('form');

    // Функция обновления списка курсов
    function updateCourseList(filteredCourses) {
        if (!coursesContainer) return; // Проверка на существование контейнера

        coursesContainer.innerHTML = ""; // Очистить список
        if (filteredCourses.length === 0) {
            coursesContainer.innerHTML = "<p class='text-muted'>Курсы не найдены</p>";
        } else {
            filteredCourses.forEach(course => {
                const courseItem = document.createElement('a');
                courseItem.href = '#';
                courseItem.classList.add('list-group-item', 'list-group-item-action');
                courseItem.textContent = course;
                coursesContainer.appendChild(courseItem);
            });
        }
    }

    // Загрузка данных с API
    fetch('http://cat-facts-api.std-900.ist.mospolytech.ru/api/courses?api_key=b78c42e5-091f-4814-b2af-6bafd7670be9')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Полученные данные:', data); // Просмотр данных

            if (data && data.courses && data.teachers) {
                // Обработка курсов
                courseNames = data.courses.map(course => course.name);
                updateCourseList(courseNames);

                // Обработка преподавателей
                const teacherContainer = document.getElementById('teachers-list');
                if (teacherContainer) {
                    data.teachers.forEach(teacher => {
                        const teacherItem = document.createElement('li');
                        teacherItem.classList.add('list-group-item');
                        teacherItem.textContent = `${teacher.teacher} - ${teacher.level} (${teacher.total_length} лет опыта)`;
                        teacherContainer.appendChild(teacherItem);
                    });
                }
            } else {
                throw new Error('Неверный формат данных от API');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            alert('Не удалось загрузить данные. Проверьте формат или соединение.');
        });

    // Обработка поиска
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвратить перезагрузку страницы
        const query = searchInput.value.toLowerCase().trim();
        const filteredCourses = courseNames.filter(course => course.toLowerCase().includes(query));
        updateCourseList(filteredCourses);
    });
});