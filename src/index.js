import "./style.css";
import { todoFactory } from './TodoFactory.js';
import { projectFactory } from './ProjectFactory.js';
import { projectInfoFactory } from "./projectInfoFactory.js";
import { makeHeader } from './header.js';
import { makeSidebar } from './sidebar.js';
import { makeProjectView } from './projectView.js';
import * as todoView from './todoView.js';
import { todoInfoFactory } from "./todoInfoFactory.js";

const projectManager = (function (){
    const defaultProject = projectFactory('Default');
    const projectsArray = [defaultProject];

    const _isValidIndex = function(index) {
        if(index >= 0 && index < projectsArray.length)
            return true;
        else 
            return false;
    }
    const _isValidDeleteIndex = function(index) {
        if(index > 0 && index < projectsArray.length)
            return true;
        else
            return false;
    }

    const addProject = function(title) {
        projectsArray.push(projectFactory(title));
    }
    const deleteProject = function(projectIndex) {
        if(_isValidDeleteIndex(projectIndex))
            projectsArray.splice(projectIndex, 1);
    }
    const editProject = function(projectIndex, title) {
        if(_isValidDeleteIndex(projectIndex))
            projectsArray[projectIndex].setTitle(title);
    }
    const getProjectAt = function(projectIndex) {
        if(_isValidIndex(projectIndex))
            return projectsArray[projectIndex];
        else
            return null;
    }
    const getProjectsArray = function() {
        return projectsArray.map((project) => project);
    }

    const addTodo = function(projectIndex, todo) {
        if(_isValidIndex(projectIndex))
            projectsArray[projectIndex].addTodo(todo);
    }
    const deleteTodo = function(projectIndex, todoIndex) {
        if(_isValidIndex(projectIndex))
            projectsArray[projectIndex].deleteTodo(todoIndex);
    }
    const getTodoAt = function(projectIndex, todoIndex) {
        if(_isValidIndex(projectIndex))
            return projectsArray[projectIndex].getTodoAt(todoIndex);
        else
            return null;
    }
    const getProjectTodoArray = function(projectIndex) {
        if(_isValidIndex(projectIndex))
            return projectsArray[projectIndex].getTodoArray();
        else
            null;
    }

    return { addProject, deleteProject, editProject, getProjectAt, getProjectsArray,
            addTodo, deleteTodo, getTodoAt, getProjectTodoArray };
})();

const logicModule = (function() {
    let selectedProjectIndex = 0;
    let selectedTodoIndex = -1;
    let editingTodo = false;
    let addingTodo = false;

    const _getSelectedProject = function() {
        return projectManager.getProjectAt(selectedProjectIndex);
    }

    const setSelectedProjectIndex = function(projectIndex) {
        if(projectManager.getProjectAt(projectIndex) != null)
            selectedProjectIndex = projectIndex;
    }
    const getSelectedProjectIndex = function() {
        return selectedProjectIndex;
    }
    //may have to do some input validation later on these two functions
    const setSelectedTodoIndex = function(todoIndex) {
        selectedTodoIndex = todoIndex;
    }
    const getSelectedTodoIndex = function() {
        return selectedTodoIndex;
    }
    const setEditingTodo = function(boolean) {
        editingTodo = boolean;
    }
    const setAddingTodo = function(boolean) {
        addingTodo = boolean;
    }
    const isEditingTodo = function() {
        return editingTodo;
    }
    const isAddingTodo = function() {
        return addingTodo;
    }
    
    //helper functions temporarily placed here
    const getProjectTitles = function() {
        const projArray = projectManager.getProjectsArray();
        return projArray.map((project)=>project.getTitle());
    }
    const getSelectedProjInfo = function() {
        const project = _getSelectedProject();
        return projectInfoFactory(project);
    }
    const getProjInfoAt = function(projectIndex) {
        const project = projectManager.getProjectAt(projectIndex);
        if(project != null)
            return projectInfoFactory(project);
        else{
            const emptyProject = projectFactory('');
            return projectInfoFactory(emptyProject);
        }
    }
    const getTodoInfoAt = function(todoIndex) {
        const todo = projectManager.getTodoAt(selectedProjectIndex, todoIndex);
        const project = projectManager.getProjectAt(selectedProjectIndex);
        const projectTitle = project.getTitle();

        return todoInfoFactory(todo, projectTitle);
    }

    return { setSelectedProjectIndex, getSelectedProjectIndex, 
        setSelectedTodoIndex, getSelectedTodoIndex, setEditingTodo,
        setAddingTodo, isEditingTodo, isAddingTodo, getProjectTitles, 
        getSelectedProjInfo , getProjInfoAt, getTodoInfoAt };
})();


const displayController = (function() {
    const container = document.querySelector('#content');
    let dialog;

    const initiatePage = function() {
        container.appendChild(makeHeader());
        container.appendChild(makeSidebar(logicModule.getProjectTitles()));
        container.appendChild(makeProjectView(logicModule.getProjInfoAt(0)));

        _addSidebarListeners();
        _addProjectViewListeners();
    }

    //UPDATES PAGE SECTIONS TO REPRESENT CHANGES MADE-----------------------------
    const _updateSidebar = function() {
        container.removeChild(container.childNodes[1]);
        const newSidebar = makeSidebar(logicModule.getProjectTitles());
        container.insertBefore(newSidebar, container.childNodes[1]);
        _addSidebarListeners();
    }

    const _updateProjectView = function() {
        container.removeChild(container.childNodes[2]);
        const newProjInfo = logicModule.getSelectedProjInfo();
        container.insertBefore(makeProjectView(newProjInfo), container.childNodes[2]);
        _addProjectViewListeners();
    }

    const _updateTodoView = function() {
        dialog = todoView.makeTodoView(logicModule.getProjectTitles());
        container.appendChild(dialog);
        _addTodoViewListeners();
    }

    //ADDS LISTENERS TO ALL RELEVENAT ELEMENTS IN EACH SECTION---------------------
    const _addSidebarListeners = function() {
        const displayedProjects = document.querySelectorAll('.sidebar-list-item');
        displayedProjects.forEach((project)=>project.addEventListener('click', _selectProjectHandler));

        //const editProjectBttn;
        //const deleteProjectBttn;
        
        const newProjectBttn = document.querySelector('.new-project-bttn');
        newProjectBttn.addEventListener('click', _newProjectHandler);

        const newTodoBttn = document.querySelector('.new-todo-bttn');
        newTodoBttn.addEventListener('click', _addTodoHandler);
    }

    const _addProjectViewListeners = function() {
        const todoArray = document.querySelectorAll('.project-list-item');
        todoArray.forEach((todo)=>todo.addEventListener('click', _selectTodoHandler));

        const addTodoBttn = document.querySelector('.add-todo-bttn');
        addTodoBttn.addEventListener('click', _addTodoHandler);
    }

    const _addTodoViewListeners = function() {
        const submitBttn = document.querySelector('.form-control-submit-bttn');
        submitBttn.addEventListener('click', _submitTodoHandler);

        const cancelBttn = document.querySelector('.form-control-cancel-bttn');
        cancelBttn.addEventListener('click', _cancelTodoHandler);
    }


    //EVENT HANDLERS GO HERE -------------------------------------------------------
    const _selectProjectHandler = function(event) {
        const projectElement = event.currentTarget;
        const projectIndex = Number(projectElement.getAttribute('data-index'));
        logicModule.setSelectedProjectIndex(projectIndex);

        _updateProjectView();
    }

    const _newProjectHandler = function(event) {
        const newTitle = prompt('Enter the new project name: ');
        if(newTitle != null){
            projectManager.addProject(newTitle);
            _updateSidebar();
        }
    }

    const _addTodoHandler = function(event) {
        _updateTodoView();
        
        logicModule.setAddingTodo(true);

        dialog.showModal();
    }

    const _selectTodoHandler = function(event) {
        _updateTodoView()

        const todoElement = event.currentTarget;
        const todoIndex = Number(todoElement.getAttribute('data-index'));
        const todoInfo = logicModule.getTodoInfoAt(todoIndex);

        logicModule.setSelectedTodoIndex(todoIndex);
        logicModule.setEditingTodo(true);
        todoView.updateTodoInfo(todoInfo);

        dialog.showModal();        
    }

    const _submitTodoHandler = function() {
        const title = todoView.getTitleValue();
        const desc = todoView.getDescValue();
        const dueDate = todoView.getDueDateValue();
        const priority = todoView.getPriorityValue();
        const notes = todoView.getNotesValue();
        const newTodo = todoFactory(title, desc, dueDate, priority, notes);

        const newProjectIndex = todoView.getProjectDestValue();

        if(logicModule.isAddingTodo()){
            projectManager.addTodo(newProjectIndex, newTodo);

            logicModule.setAddingTodo(false);
        }
        else if(logicModule.isEditingTodo()){
            //need to set up todo index tracker in logic module
            const todoIndex = logicModule.getSelectedTodoIndex();
            const currentProjectIndex = logicModule.getSelectedProjectIndex();
            projectManager.deleteTodo(currentProjectIndex, todoIndex);

            projectManager.addTodo(newProjectIndex, newTodo);
            
            logicModule.setEditingTodo(false);
        }

        _updateProjectView();
        _cancelTodoHandler();
    }

    const _cancelTodoHandler = function() {
        dialog.close();
        container.removeChild(dialog);
    }

    const _getFormInfo = function() {
        const title = todoView.getTitleValue();
        const desc = todoView.getDescValue();
        const dueDate = todoView.getDueDateValue();
        const priority = todoView.getPriorityValue();
        const notes = todoView.getNotesValue();
        
        return todoFactory(title, desc, dueDate, priority, notes);
    }

    return { initiatePage };
})();

const dummyTodo = todoFactory('dummyTodo', 'this is dummy todo', new Date(2000, 2, 1), 'high-priority', 'no notes');
projectManager.addTodo(0,dummyTodo);

displayController.initiatePage();

