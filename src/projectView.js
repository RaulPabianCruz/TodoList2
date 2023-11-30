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
    container.classList.add('project-list-container');

    const list = document.createElement('ol');
    list.classList.add('project-list');

    for(let i = 0; i < titles.length; i++){
        const listItem = document.createElement('li');
        listItem.textContent = titles[i];

        listItem.classList.add('project-list-item');
        listItem.classList.add(priorities[i]);
        listItem.setAttribute('data-index', i);

        const itemDueDate = document.createElement('p');
        itemDueDate.textContent = 'Due Date: ' + dueDates[i];
        itemDueDate.classList.add('item-due-date');
        listItem.appendChild(itemDueDate);

        list.appendChild(listItem);
    }

    container.appendChild(list);

    return container;
}


const makeOptions = function() {
    const container = document.createElement('div');
    container.classList.add('project-view-options');

    const bttn = document.createElement('button');
    bttn.textContent = 'Add Task';
    bttn.classList.add('add-tast-bttn');
    bttn.classList.add('project-view-bttn');

    container.appendChild(bttn);

    return container;
}

export { makeProjectView };