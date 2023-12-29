import "./style.css";
import { todoFactory } from './TodoFactory.js';
import { projectFactory } from './ProjectFactory.js';
import { projectInfoFactory } from "./projectInfoFactory.js";
import { makeHeader } from './header.js';
import { makeSidebar } from './sidebar.js';
import { makeProjectView } from './projectView.js';
import * as todoView from './todoView.js';
import { todoInfoFactory } from './todoInfoFactory.js';
import { storageAvailable, getStorage } from './webStorage.js';

const projectManager = (function (){
    const defaultProject = projectFactory('Default');
    let projectsArray = [defaultProject];

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

    const setProjectsArray = function(newArray) {
        projectsArray = newArray;
    }
    const getProjectsArray = function() {
        return projectsArray.map((project) => project);
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
    const getProjectTitles = function() {
        const projArray = projectManager.getProjectsArray();
        return projArray.map((project)=>project.getTitle());
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

    return { setProjectsArray, getProjectsArray, addProject, deleteProject, editProject,
         getProjectAt, getProjectTitles, addTodo, deleteTodo, getTodoAt, getProjectTodoArray };
})();


//keeps track of choices and selections made
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
    
    const getSelectedProjInfo = function() {
        const project = _getSelectedProject();
        return projectInfoFactory(project);
    }
    const getSelectedTodoInfo = function() {
        const project = projectManager.getProjectAt(selectedProjectIndex);
        const projectTitle = project.getTitle();
        const todo = projectManager.getTodoAt(selectedProjectIndex, selectedTodoIndex);

        return todoInfoFactory(todo, projectTitle);
    }
    const deleteSelectedTodo = function() {
        projectManager.deleteTodo(selectedProjectIndex, selectedTodoIndex);
    }

    return { setSelectedProjectIndex, getSelectedProjectIndex, 
        setSelectedTodoIndex, getSelectedTodoIndex, setEditingTodo,
        setAddingTodo, isEditingTodo, isAddingTodo, getSelectedProjInfo,
        getSelectedTodoInfo, deleteSelectedTodo };
})();


const displayController = (function() {
    const container = document.querySelector('#content');
    let dialog;

    const initiatePage = function() {
        container.appendChild(makeHeader());
        container.appendChild(makeSidebar(projectManager.getProjectTitles()));
        container.appendChild(makeProjectView(logicModule.getSelectedProjInfo()));

        _addSidebarListeners();
        _addProjectViewListeners();
    }

    //UPDATES PAGE SECTIONS TO REPRESENT CHANGES MADE-----------------------------
    const updateSidebar = function() {
        container.removeChild(container.childNodes[1]);
        const newSidebar = makeSidebar(projectManager.getProjectTitles());
        container.insertBefore(newSidebar, container.childNodes[1]);
        _addSidebarListeners();
    }

    const updateProjectView = function() {
        container.removeChild(container.childNodes[2]);
        const newProjInfo = logicModule.getSelectedProjInfo();
        container.insertBefore(makeProjectView(newProjInfo), container.childNodes[2]);
        _addProjectViewListeners();
    }

    const updateTodoView = function() {
        dialog = todoView.makeTodoView(projectManager.getProjectTitles());
        container.appendChild(dialog);
        _addTodoViewListeners();
    }

    const showTodoForm = function() {
        dialog.showModal();
    }

    const hideTodoForm = function() {
        dialog.close();
    }

    const removeTodoForm = function() {
        container.removeChild(dialog);
    }

    //ADDS LISTENERS TO ALL RELEVENAT ELEMENTS IN EACH SECTION---------------------
    const _addSidebarListeners = function() {
        const displayedProjects = document.querySelectorAll('.sidebar-list-item');
        displayedProjects.forEach((project)=>project.addEventListener('click', handlerModule.selectProjectHandler));

        const editProjectBttn = document.querySelectorAll('.sidebar-list-edit');
        editProjectBttn.forEach((bttn)=>bttn.addEventListener('click', handlerModule.editProjectHandler));
        
        const deleteProjectBttns = document.querySelectorAll('.sidebar-list-delete');
        deleteProjectBttns.forEach((bttn) => bttn.addEventListener('click', handlerModule.deleteProjectHandler));
        
        const newProjectBttn = document.querySelector('.new-project-bttn');
        newProjectBttn.addEventListener('click', handlerModule.newProjectHandler);

        const newTodoBttn = document.querySelector('.new-todo-bttn');
        newTodoBttn.addEventListener('click', handlerModule.addTodoHandler);
    }

    const _addProjectViewListeners = function() {
        const todoArray = document.querySelectorAll('.todo-info-container');
        todoArray.forEach((todo)=>todo.addEventListener('click', handlerModule.selectTodoHandler));

        const deleteBttns = document.querySelectorAll('.todo-item-delete');
        deleteBttns.forEach((bttn)=>bttn.addEventListener('click', handlerModule.deleteTodoHandler));

        const addTodoBttn = document.querySelector('.add-todo-bttn');
        addTodoBttn.addEventListener('click', handlerModule.addTodoHandler);
    }

    const _addTodoViewListeners = function() {
        const submitBttn = document.querySelector('.form-control-submit-bttn');
        submitBttn.addEventListener('click', handlerModule.submitTodoHandler);

        const cancelBttn = document.querySelector('.form-control-cancel-bttn');
        cancelBttn.addEventListener('click', handlerModule.cancelTodoHandler);
    }

    return { initiatePage, updateSidebar, updateProjectView, updateTodoView,
    showTodoForm, hideTodoForm, removeTodoForm };
})();

//event handlers all here --------------------------------------------------
const handlerModule = (function() {

    const selectProjectHandler = function(event) {
        const projectElement = event.currentTarget;
        const projectIndex = Number(projectElement.getAttribute('data-index'));
        logicModule.setSelectedProjectIndex(projectIndex);

        displayController.updateProjectView();
    }

    const editProjectHandler = function(event) {
        const bttnContainer = event.currentTarget.parentElement;
        const index = Number(bttnContainer.getAttribute('data-index'));

        const newTitle = prompt('Enter the project\'s new name: ');
        if(newTitle != null){
            let project = projectManager.getProjectAt(index);
            let oldTitle = project.getTitle();
            project.setTitle(newTitle);
            displayController.updateSidebar();

            if(index == logicModule.getSelectedProjectIndex())
                displayController.updateProjectView();

            storageModule.storeProjectTitles();
            storageModule.unstoreProject(oldTitle);
            storageModule.storeProject(index)
        }
    }

    const deleteProjectHandler = function(event) {
        const bttnContainer = event.currentTarget.parentElement;
        const index = Number(bttnContainer.getAttribute('data-index'));

        if(confirm('Are you sure you want to delete this project?')){
            let oldTitle = projectManager.getProjectAt(index).getTitle();

            projectManager.deleteProject(index);
            displayController.updateSidebar();

            const currentIndex = logicModule.getSelectedProjectIndex();
            if(index <= currentIndex){
                logicModule.setSelectedProjectIndex(currentIndex - 1);
                displayController.updateProjectView();
            }

            storageModule.storeProjectTitles();
            storageModule.unstoreProject(oldTitle);
        }
    }

    const newProjectHandler = function(event) {
        const newTitle = prompt('Enter the new project name: ');
        if(newTitle != null){
            projectManager.addProject(newTitle);
            displayController.updateSidebar();

            let lastIndex = projectManager.getProjectTitles().length - 1;
            storageModule.storeProjectTitles();
            storageModule.storeProject(lastIndex);
        }


    }

    const addTodoHandler = function(event) {
        displayController.updateTodoView();
        
        logicModule.setAddingTodo(true);

        displayController.showTodoForm();
    }

    const selectTodoHandler = function(event) {
        displayController.updateTodoView()

        const todoElement = event.currentTarget;
        const todoIndex = Number(todoElement.getAttribute('data-index'));
        logicModule.setSelectedTodoIndex(todoIndex);

        logicModule.setEditingTodo(true);

        todoView.updateTodoInfo(logicModule.getSelectedTodoInfo());

        displayController.showTodoForm();       
    }

    const submitTodoHandler = function() {
        if(_isFormInfoValid()){
            const newTodo = _getDialogFormTodo();
            const newProjectIndex = todoView.getProjectDestValue();

            if(logicModule.isAddingTodo()){
                projectManager.addTodo(newProjectIndex, newTodo);

                logicModule.setAddingTodo(false);
            }
            else if(logicModule.isEditingTodo()){
                logicModule.deleteSelectedTodo();

                projectManager.addTodo(newProjectIndex, newTodo);
                
                logicModule.setEditingTodo(false);

                storageModule.storeProject(logicModule.getSelectedProjectIndex());
            }

            storageModule.storeProject(newProjectIndex);

            displayController.updateProjectView();
            cancelTodoHandler();
        }
    }

    const cancelTodoHandler = function() {
        displayController.hideTodoForm();
        displayController.removeTodoForm();
    }

    const deleteTodoHandler = function(event) {
        const bttnElem = event.currentTarget;
        const todoIndex = Number(bttnElem.getAttribute('data-index'));
        logicModule.setSelectedTodoIndex(todoIndex);

        if(confirm('Are you sure you want to delete this Todo?')){
            logicModule.deleteSelectedTodo();

            displayController.updateProjectView();

            storageModule.storeProject(logicModule.getSelectedProjectIndex());
        }
    }

    const _getDialogFormTodo = function() {
        const title = todoView.getTitleValue();
        const desc = todoView.getDescValue();
        const dueDate = todoView.getDueDateValue();
        const priority = todoView.getPriorityValue();
        const notes = todoView.getNotesValue();

        return todoFactory(title, desc, dueDate, priority, notes);
    }

    const _isFormInfoValid = function() {
        if(todoView.getTitleValue() === '' || todoView.getDescValue() === '' ||
            todoView.getDueDateValue() === '' || todoView.getNotesValue() === '')
            return false;
        else
            return true;
    }

    return { selectProjectHandler, editProjectHandler, deleteProjectHandler,
        newProjectHandler, addTodoHandler, selectTodoHandler, 
        submitTodoHandler, cancelTodoHandler, deleteTodoHandler };
})();


const storageModule = (function() {
    let isStorageAvailable = false;    

    const initiateStorage = function() {
        //checks that local storage functionality is available
        if(storageAvailable('localStorage')){
            isStorageAvailable = true;

            //checks whether local storage already contains info
            if(localStorage.getItem('projectTitles')){
                let projectsArray = getStorage();
                projectManager.setProjectsArray(projectsArray);
            }
            else {
                let projectTitles = projectManager.getProjectTitles();
                let defaultProject = projectManager.getProjectAt(0);
                localStorage.setItem('projectTitles', JSON.stringify(projectTitles));
                localStorage.setItem('Default', JSON.stringify(defaultProject));
            }
        }
    }

    const storeProjectTitles = function() {
        if(isStorageAvailable){
            let projectTitles = projectManager.getProjectTitles();
            localStorage.setItem('projectTitles', JSON.stringify(projectTitles));
        }
    }

    const storeProject = function(projectIndex) {
        if(isStorageAvailable){
            let project = projectManager.getProjectAt(projectIndex);
            let projectTitle = project.getTitle();
            localStorage.setItem(projectTitle, JSON.stringify(project));
        }
    }

    const unstoreProject = function(projectTitle) {
        if(isStorageAvailable){
            localStorage.removeItem(projectTitle);
        }
    }

    return { initiateStorage, storeProjectTitles, storeProject,
            unstoreProject };
})();

storageModule.initiateStorage();
displayController.initiatePage();