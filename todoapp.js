	'use strick';
	const todoMask = 'keyTodo_';
	const todoList = $('#todoApp ul');
	const todoStorage = window.localStorage;
		// the function reading from localStorage
		function todoShowTasks() {
		  let localIndex = 1;
		  // add storage keys into array
		  let keyStorage = Object.keys(todoStorage);
		  let sizeStorage = todoStorage.length;
				for (let localkey of keyStorage) {
				// check includes todomask in keys
					let rightSide = sizeStorage - localIndex;
					let fullKeyTodo = todoMask + rightSide;
					if (keyStorage.includes(fullKeyTodo)) {
						// extract and print todoValue
						console.log(todoStorage.getItem(fullKeyTodo));
						$('<li></li>').addClass('todoItem')
						 .attr({'data-itemid': fullKeyTodo,
						  'title': "Кликните мышкой, чтобы удалить"})
						 .text(todoStorage.getItem(fullKeyTodo))
						  .appendTo(todoList);
					  };
				localIndex += 1;
				};
			};
		// start function reading from localStorage
				todoShowTasks();

		// the function writing to localStorage
		$('#todoApp input').on('change', function (elem) {
		  // if (elem.key != "Enter" || elem.code != "Enter") return;
			let number_Id = 0;
			let lineTodo = elem.target.value;
			elem.target.value = "";
			if (lineTodo.length > 0) {
			// Получаем число текущего размера
			number_Id = localStorage.length;
			console.log('number_Id: ' + number_Id);
			// Отправляем новую запись в хранилище
			todoStorage.setItem(todoMask + number_Id, lineTodo);
			// Добавляем запись в конец списка
			$('<li></li>').addClass('todoItem')
			  .attr({'data-itemid': todoMask + number_Id,
			'title': "Кликните мышкой, чтобы удалить"})
			  .text(lineTodo).appendTo(todoList);
				console.log('Added: ' + number_Id);
		  }
		});

		// the function removing from localStorage
		$(document).on('click', '.todoItem', function (elem) {
		  let todoDel = $(elem.target);
		  console.log('Removed: ' + todoDel.attr('data-itemid'));
		  todoStorage.removeItem(todoDel.attr('data-itemid'));
		  if (todoStorage.length === 0) {
				console.log(todoStorage.length);
				todoStorage.clear();
		  }
		  todoDel.remove();
		})
