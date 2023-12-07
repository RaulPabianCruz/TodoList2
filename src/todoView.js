const makeTodoView = function(projectTitles) {
    const dialog = document.createElement('dialog');
    dialog.classList.add('todo-dialog');

    dialog.appendChild(_makeForm(projectTitles));
    
    return dialog;
}

const updateProjectDest = function(projectTitles) {
    let projectDest = document.querySelector('#project-dest');
    projectDest.replaceChildren();

    return _addProjectDestOptions(projectDest, projectTitles);
}

const updateTodoInfo = function(todoInfo, projectTitles) {
    _updateTitleText(todoInfo.getTodoTitle());
    _updateDescText(todoInfo.getTodoDesc());
    _updateDueDateText(todoInfo.getTodoDueDate());
    _updatePriorityText(todoInfo.getTodoPriority());
    _updateProjectDestText(todoInfo.getTodoLocation(), projectTitles);
    _updateNotesText(todoInfo.getTodoNotes());
}

const _makeForm = function(projectTitles) {
    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');
    form.classList.add('todo-form');

    form.appendChild(_makeTitle());
    form.appendChild(_makeDesc());
    form.appendChild(_makeDueDate());
    form.appendChild(_makePriority());
    form.appendChild(_makeProjectDest(projectTitles));
    form.appendChild(_makeNotes());
    form.appendChild(_makeFormBttns());

    return form;
}

const _makeTitle = function() {
    const container = document.createElement('div');
    container.classList.add('todo-title-container');
    container.classList.add('form-control-container');

    const label = document.createElement('label');
    label.classList.add('form-control-label');
    label.htmlFor = 'todo-title';
    label.textContent = 'Title: ';

    const input = document.createElement('input');
    input.classList.add('form-control-text-input');
    input.type = 'text';
    input.id = 'todo-title';

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

const _makeDesc = function() {
    const container = document.createElement('div');
    container.classList.add('todo-desc-container');
    container.classList.add('form-control-container');

    const label = document.createElement('label');
    label.classList.add('form-control-label');
    label.htmlFor = 'todo-description';
    label.textContent = 'Description: ';

    const input = document.createElement('input');
    input.classList.add('form-control-text-input');
    input.type = 'text';
    input.id = 'todo-description';

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

const _makeDueDate = function() {
    const container = document.createElement('div');
    container.classList.add('todo-due-date-container');
    container.classList.add('form-control-container');

    const label = document.createElement('label');
    label.classList.add('form-control-label');
    label.htmlFor = 'todo-due-date';
    label.textContent = 'Due Date: ';

    const input = document.createElement('input');
    input.classList.add('form-control-date-input');
    input.type = 'date';
    input.id = 'todo-due-date';

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

const _makePriority = function() {
    const container = document.createElement('div');
    container.classList.add('todo-priority-container');
    container.classList.add('form-control-container');

    const label = document.createElement('label');
    label.classList.add('form-control-label');
    label.htmlFor = 'todo-priority';
    label.textContent = 'Priority: ';

    const select = document.createElement('select');
    select.classList.add('form-control-select');
    select.id = 'todo-priority';

    const option1 = document.createElement('option');
    option1.textContent = 'low-priority';
    const option2 = document.createElement('option');
    option2.textContent = 'normal-priority';
    const option3 = document.createElement('option');
    option3.textContent = 'high-priority';

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    container.appendChild(label);
    container.appendChild(select);

    return container;
}

const _makeProjectDest = function(projectTitles) {
    const container = document.createElement('div');
    container.classList.add('todo-dest-container');
    container.classList.add('form-control-container');

    const label = document.createElement('label');
    label.classList.add('form-control-label');
    label.htmlFor = 'project-dest';
    label.textContent = 'Project Destination: ';

    let select = document.createElement('select');
    select = _addProjectDestOptions(select, projectTitles);
    select.classList.add('form-control-select');
    select.id = 'project-dest';

    container.appendChild(label);
    container.appendChild(select);

    return container;
}

const _addProjectDestOptions = function(projectDest, projectTitles) {
    for(let i = 0; i < projectTitles.length; i++){
        const option = document.createElement('option');
        option.textContent = projectTitles[i];
        option.classList.add('project-dest-option');
        option.setAttribute('data-index', i);
        option.setAttribute('value', i);

        projectDest.appendChild(option);
    }
    return projectDest;
}

const _makeNotes = function() {
    const container = document.createElement('div');
    container.classList.add('todo-notes-container');
    container.classList.add('form-control-container');

    const label = document.createElement('label');
    label.classList.add('form-control-label');
    label.htmlFor = 'todo-notes';
    label.textContent = 'Notes: ';

    const input = document.createElement('input');
    input.classList.add('form-control-text-input');
    input.type = 'text';
    input.id = 'todo-notes';

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

const _makeFormBttns = function() {
    const container = document.createElement('div');
    container.classList.add('todo-bttns-container');
    container.classList.add('form-control-container');

    const cancelBttn = document.createElement('button');
    cancelBttn.textContent = 'Cancel';
    cancelBttn.type = 'button';
    cancelBttn.classList.add('form-control-cancel-bttn');
    cancelBttn.classList.add('form-control-bttn');

    const submitBttn = document.createElement('button');
    submitBttn.textContent = 'Submit';
    submitBttn.type = 'submit';
    submitBttn.classList.add('form-control-submit-bttn');
    submitBttn.classList.add('form-control-bttn');

    container.appendChild(cancelBttn);
    container.appendChild(submitBttn);

    return container;
}

const _updateTitleText = function(todoTitle) {
    const title = document.querySelector('#todo-title');
    title.setAttribute('value', todoTitle);
}

const _updateDescText = function(todoDesc) {
    const desc = document.querySelector('#todo-description');
    desc.setAttribute('value', todoDesc);
}

const _updateDueDateText = function(todoDate) {
    const dueDate = document.querySelector('#todo-due-date');

    let month = todoDate.getMonth().toString();
    let date = todoDate.getDate().toString();
    if(month.length < 2)
        month = '0' + month;
    if(date.length < 2)
        date = '0' + date;

    const dateString = `${todoDate.getFullYear()}-${month}-${date}`;
    dueDate.setAttribute('value', dateString);
}

const _updatePriorityText = function(todoPriority) {
    const priority = document.querySelector('#todo-priority');
    const options = priority.children;
    for(let i = 0; i < options.length; i++){
        if(options[i].textContent == todoPriority)
            options[i].setAttribute('selected', true);
    }
}

const _updateProjectDestText = function(projectLocation, projectTitles) {
    const projectDest = updateProjectDest(projectTitles);
    const projOptions = projectDest.children;
    for(let i = 0; i < projOptions.length; i++){
        if(projOptions[i].textContent == projectLocation)
            projOptions[i].setAttribute('selected', true);
    }
}

const _updateNotesText = function(todoNotes) {
    const notes = document.querySelector('#todo-notes');
    notes.setAttribute('value', todoNotes);
}

export { makeTodoView, updateProjectDest, updateTodoInfo }