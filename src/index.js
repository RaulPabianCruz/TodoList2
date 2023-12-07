import "./style.css";
import { todoFactory } from './TodoFactory.js';
import { projectFactory } from './ProjectFactory.js';
import { projectInfoFactory } from "./projectInfoFactory.js";
import { makeHeader } from './header.js';
import { makeSidebar } from './sidebar.js';
import { makeProjectView } from './projectView.js';
import { makeTodoView, updateProjectDest, updateTodoInfo } from './todoView.js';
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
    //let selectedTodoIndex;

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

    return { setSelectedProjectIndex, getSelectedProjectIndex, getProjectTitles, getProjInfoAt,
        getSelectedProjInfo };
})();



const displayController = (function() {
    const container = document.querySelector('#content');
    const dialog = makeTodoView(logicModule.getProjectTitles());

    const initiatePage = function() {
        container.appendChild(makeHeader());
        container.appendChild(makeSidebar(logicModule.getProjectTitles()));
        container.appendChild(makeProjectView(logicModule.getProjInfoAt(0)));
        container.appendChild(dialog);

        _addSidebarListeners();
        _addProjectViewListeners();
        _addTodoViewListeners();
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


    //ADDS LISTENERS TO ALL RELEVENAT ELEMENTS IN EACH SECTION---------------------
    const _addSidebarListeners = function() {
        const displayedProjects = document.querySelectorAll('.sidebar-list-item');
        displayedProjects.forEach((project)=>project.addEventListener('click', _selectProjectHandler));

        //const editProjectBttn;
        //const deleteProjectBttn;
        
        const newProjectBttn = document.querySelector('.new-project-bttn');
        newProjectBttn.addEventListener('click', _newProjectHandler);

        //const newTodoBttn = document.querySelector('.new-todo-bttn');
        //newTodoBttn.addEventListener('click', _newTodoHandler);
    }

    const _addProjectViewListeners = function() {
        const todoArray = document.querySelectorAll('.project-list-item');
        todoArray.forEach((todo)=>todo.addEventListener('click', _selectTodoHandler));

        //const addTodoBttn = document.querySelector('.add-todo-bttn');
        //addTodoBttn.addEventListener('click', _newTodoHandler);
    }

    const _addTodoViewListeners = function() {
        //const submitBttn = document.querySelector('form-control-submit-bttn');
        //submitBttn.addEventListener('click', _submitTodoHandler);

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

    const _newTodoHandler = function(event) {

    }

    const _selectTodoHandler = function(event) {
        const todoElement = event.currentTarget;
        const todoIndex = Number(todoElement.getAttribute('data-index'));
        const projectIndex = logicModule.getSelectedProjectIndex();

        const todo = projectManager.getTodoAt(projectIndex, todoIndex);
        const projectTitle = projectManager.getProjectAt(projectIndex).getTitle();

        const todoInfo = todoInfoFactory(todo, projectTitle);
        const projectDest = logicModule.getProjectTitles();
        updateTodoInfo(todoInfo, projectDest);

        dialog.showModal();        
    }

    const _cancelTodoHandler = function(event) {
        dialog.close();
        
        const form = document.querySelector('.todo-form');
        form.reset();
    }

    return { initiatePage };
})();

const dummyTodo = todoFactory('dummyTodo', 'this is dummy todo', new Date(2000, 1, 1), 'high-priority', 'no notes');
projectManager.addTodo(0,dummyTodo);

displayController.initiatePage();

