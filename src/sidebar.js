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
        const container = document.createElement('div');
        container.classList.add('list-item-container');

        const listItem = document.createElement('li');
        listItem.textContent = projectTitles[i];
        listItem.classList.add('sidebar-list-item');
        listItem.setAttribute('data-index', i);

        container.appendChild(listItem);
        if(i > 0)
            container.appendChild(makeProjectButtons(i));
        
        list.appendChild(container);
    }

    return list;
}

const makeProjectButtons = function(index) {
    const container = document.createElement('div');
    container.classList.add('sidebar-list-bttn-container');
    container.setAttribute('data-index', index);

    const editBttn = document.createElement('button');
    editBttn.classList.add('sidebar-list-bttn');
    editBttn.classList.add('sidebar-list-edit');

    const delBttn = document.createElement('button');
    delBttn.classList.add('sidebar-list-bttn');
    delBttn.classList.add('sidebar-list-delete');

    container.appendChild(editBttn);
    container.appendChild(delBttn);

    return container;
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
