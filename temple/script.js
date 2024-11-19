document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        // Убрать активный класс у всех вкладок
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Скрыть все формы
        document.querySelectorAll('.form-container').forEach(form => {
            form.classList.add('hidden');
        });

        // Показать выбранную форму
        document.querySelector(`.${target}-form`).classList.remove('hidden');
    });
});
