let todos = [];

window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.getElementById('name');
	const newTodoForm = document.querySelector('#newTodoForm');

	const username = localStorage.getItem('username') || '';
	nameInput.value = username;

	renderTodos();

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	});

	newTodoForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			done: false,
		};

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		renderTodos();
	});
});

renderTodos();

function renderTodos() {
	const todoList = document.getElementById('todoList');

	todoList.innerHTML = '';

	todos.forEach((todo) => {
		const todoTask = document.createElement('div');
		todoTask.classList.add('todo');

		const doneButton = document.createElement('input');

		const taskContent = document.createElement('div');
		taskContent.classList.add('taskContent');

		const actions = document.createElement('div');
		actions.classList.add('actions');

		const editButton = document.createElement('button');
		editButton.classList.add('editButton');

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('deleteButton');

		doneButton.type = 'checkbox';
		doneButton.checked = todo.done;
		doneButton.classList.add('completeRadio');

		taskContent.innerHTML = `<input type="text" class="task" value="${todo.content}" readonly />`;
		editButton.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		todoTask.appendChild(doneButton);
		todoTask.appendChild(taskContent);
		actions.appendChild(editButton);
		actions.appendChild(deleteButton);
		todoTask.appendChild(actions);

		todoList.appendChild(todoTask);

		if (todo.done) {
			taskContent.querySelector('input').classList.add('done');
		}

		doneButton.addEventListener('click', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				taskContent.querySelector('input').classList.add('done');
			} else {
				taskContent.querySelector('input').classList.remove('done');
			}

			renderTodos();
		});

		editButton.addEventListener('click', (e) => {
			const input = taskContent.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				renderTodos();
			});
		});

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter((t) => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			renderTodos();
		});
	});
}
