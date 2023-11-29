const makeSidebar = function(projectTitles = []) {
    const container = document.createElement('div');
    container.classList.add('sidebar');

    container.appendChild(makeSidebarTitle());
    container.appendChild(makeSidebarList(projectTitles));
    container.appendChild(makeSidebarOptions());

    return container;
};

const makeSidebarTitle = function() {
    const title = document.createElement('h2');
    title.textContent = "Projects";
    title.classList.add('sidebar-title');

    return title;
}

const makeSidebarList = function(projectTitles) {
    const list = document.createElement('ul');
    list.classList.add('sidebar-list');

    for(let i = 0; i < projectTitles.length; i++){
        const listItem = document.createElement('li');
        listItem.textContent = projectTitles[i];

        listItem.classList.add('sidebar-list-item');
        listItem.setAttribute('data-index', i);

        list.appendChild(listItem);
    }

    return list;
}

const makeSidebarOptions = function() {
    const container = document.createElement('div');
    container.classList.add('sidebar-options');

    const addProjectBttn = document.createElement('button');
    addProjectBttn.textContent = 'New Project';
    addProjectBttn.classList.add('new-project-bttn');
    addProjectBttn.classList.add('sidebar-bttn');

    const addTodoBttn = document.createElement('button');
    addTodoBttn.textContent = 'New Todo';
    addTodoBttn.classList.add('new-todo-bttn');
    addTodoBttn.classList.add('sidebar-bttn');

    container.appendChild(addProjectBttn);
    container.appendChild(addTodoBttn);
    
    return container;
}


export { makeSidebar };
