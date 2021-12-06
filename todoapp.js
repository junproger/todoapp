	'use strick';
	const todoList = $('#todoApp ul');
	const todoMask = 'keyTodo_';
	const todoStorage = window.localStorage;
		  console.log(window.localStorage);
		  console.log('Storage Length: ' + todoStorage.length);
		// the function reading from localStorage
		function todoShowTasks() {
		  let keyStorage = 0;
		  let indexMask = todoMask + 0;
		  let sizeStorage = todoStorage.length;
		  if (sizeStorage > 0) {
			for (let i = 0; i < sizeStorage; i++) {
				indexMask = todoMask + i;
				keyStorage = todoStorage.key(i);
				// console.log(`${i}: ${todoStorage.key(i)}`);
				console.log(`${indexMask}: ${todoStorage.getItem(indexMask)}`);
				  if (indexMask.indexOf(todoMask) == 0) {
					$('<li></li>').addClass('todoItem')
					  .attr({'data-itemid': indexMask, 
					  'title': "Кликните мышкой, чтобы удалить"})
					  .text(todoStorage.getItem(indexMask))
					  .appendTo(todoList);
				  }
				} 
			} else {
			return alert('Записей ещё нет!');
		}			
	}
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
		  if (todoStorage.length == 0) {
				console.log(todoStorage.length);
				todoStorage.clear();
		  }
		  todoDel.remove();
		})
