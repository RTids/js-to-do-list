window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.getElementById('name');
	const newTodo = document.querySelector('#todoList');

	const username = localStorage.getItem('username') || '';
	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	});
});
