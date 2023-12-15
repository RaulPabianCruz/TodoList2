const makeProjectView = function(projectInfo) {
    const container = document.createElement('div');
    container.classList.add('project-view-container');

    const titles = projectInfo.getTodoTitles();
    const priorities = projectInfo.getTodoPriorities();
    const dueDates = projectInfo.getTodoDueDates();

    const title = makeProjectTitle(projectInfo.getProjectTitle());
    const list = makeProjectList(titles, priorities, dueDates);
    const options = makeOptions();

    container.appendChild(title);
    container.appendChild(list);
    container.appendChild(options);

    return container;
}

const makeProjectTitle = function(projectTitle) {
    const title = document.createElement('h2');
    title.textContent = projectTitle;
    title.classList.add('project-view-title');

    return title;
}

const makeProjectList = function(titles, priorities, dueDates) {
    const container = document.createElement('div');
    container.classList.add('project-view-list-container');

    const list = document.createElement('ol');
    list.classList.add('todo-list');

    for(let i = 0; i < titles.length; i++){
        const listItem = document.createElement('li');
        listItem.classList.add('todo-list-item');

        const infoContainer = _makeTodoItemInfo(titles[i], priorities[i], dueDates[i], i);
        const bttnContainer = _makeTodoItemBttns(i);

        listItem.appendChild(infoContainer);
        listItem.appendChild(bttnContainer);
        list.appendChild(listItem);
    }

    container.appendChild(list);

    return container;
}

const _makeTodoItemInfo = function(title, priority, dueDate, index) {
    const container = document.createElement('div');
    container.classList.add('todo-info-container');
    container.classList.add(priority);
    container.setAttribute('data-index', index);

    const todoTitle = document.createElement('p');
    todoTitle.textContent = title;
    todoTitle.classList.add('todo-item-title');

    const todoDueDate = document.createElement('p');
    todoDueDate.textContent = 'Due Date: ' + dueDate.toString();
    todoDueDate.classList.add('todo-item-due-date');

    container.appendChild(todoTitle);
    container.appendChild(todoDueDate);

    return container;
}

const _makeTodoItemBttns = function(index) {
    const container = document.createElement('div');
    container.classList.add('todo-item-bttn-container');

    const button = document.createElement('button');
    button.classList.add('todo-item-delete');
    button.setAttribute('data-index', index);

    container.appendChild(button);
    return container;
}


const makeOptions = function() {
    const container = document.createElement('div');
    container.classList.add('project-view-options');

    const bttn = document.createElement('button');
    bttn.textContent = 'Add Todo';
    bttn.classList.add('add-todo-bttn');
    bttn.classList.add('project-view-bttn');

    container.appendChild(bttn);

    return container;
}

export { makeProjectView };